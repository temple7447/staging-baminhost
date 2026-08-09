import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./signature-pad.css";

const MAX_SIGNATURE_UPLOAD_BYTES = 4 * 1024 * 1024; // 4MB

export interface SignaturePadHandle {
  clear: () => void;
  hasSignature: () => boolean;
  dataUrl: () => string;
  loadImage: (dataUrl: string) => void;
}

export const SignaturePad = forwardRef<
  SignaturePadHandle,
  { onSignedChange?: (signed: boolean) => void }
>(({ onSignedChange }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const hasDrawn = useRef(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(ratio, ratio);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#16241C";
      ctxRef.current = ctx;
    }
  }, []);

  React.useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    hasDrawn.current = true;
    onSignedChange?.(true);
    const { x, y } = pos(e);
    ctxRef.current?.beginPath();
    ctxRef.current?.moveTo(x, y);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const { x, y } = pos(e);
    ctxRef.current?.lineTo(x, y);
    ctxRef.current?.stroke();
  };

  const end = () => {
    drawing.current = false;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (canvas && ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    }
    hasDrawn.current = false;
    onSignedChange?.(false);
  };

  // Renders an uploaded signature image onto the same canvas the pen draws
  // on, scaled to fit — so everything downstream (hasSignature/dataUrl, and
  // every consumer that calls them) treats an upload exactly like a drawn
  // signature, with zero changes needed anywhere else.
  const loadImage = useCallback((imgDataUrl: string) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.min(rect.width / img.width, rect.height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, (rect.width - w) / 2, (rect.height - h) / 2, w, h);
      hasDrawn.current = true;
      onSignedChange?.(true);
    };
    img.src = imgDataUrl;
  }, [onSignedChange]);

  useImperativeHandle(ref, () => ({
    clear,
    hasSignature: () => hasDrawn.current,
    dataUrl: () => canvasRef.current?.toDataURL("image/png") ?? "",
    loadImage,
  }));

  return (
    <div className="sig-pad__wrap">
      <canvas
        ref={canvasRef}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
      />
    </div>
  );
});
SignaturePad.displayName = "SignaturePad";

export function SignatureField({
  padRef,
  label,
  required,
  signed,
  optionalHint,
  viewOnly,
  imageSrc,
}: {
  padRef: React.RefObject<SignaturePadHandle>;
  label: string;
  required?: boolean;
  signed: boolean;
  optionalHint?: string;
  viewOnly?: boolean;
  imageSrc?: string | null;
}) {
  if (viewOnly) {
    return (
      <div className="sig-pad__field sig-pad__field--full">
        <label className="sig-pad__label">{label}</label>
        <div className="sig-pad__wrap">
          {imageSrc ? (
            <img src={imageSrc} alt="Signature" style={{ maxHeight: "100%", maxWidth: "100%" }} />
          ) : (
            <span className="sig-pad__note">No signature on file</span>
          )}
        </div>
      </div>
    );
  }
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file if they upload again
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_SIGNATURE_UPLOAD_BYTES) {
      setUploadError("That image is too large — please use one under 4MB.");
      return;
    }
    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (ev) => padRef.current?.loadImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="sig-pad__field sig-pad__field--full">
      <label className="sig-pad__label">
        {label}
        {required && <span className="sig-pad__req">*</span>}
      </label>
      <SignaturePad ref={padRef} onSignedChange={() => { /* status re-render handled by parent state */ }} />
      <div className="sig-pad__tools">
        <div className="sig-pad__tools-buttons">
          <button type="button" onClick={() => padRef.current?.clear()}>Clear Signature</button>
          <button type="button" onClick={() => fileInputRef.current?.click()}>Upload Signature</button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <span className="sig-pad__note">{signed ? "Signed" : "Not yet signed"}</span>
      </div>
      {uploadError && <p className="sig-pad__note sig-pad__note--error">{uploadError}</p>}
      {optionalHint && <p className="sig-pad__note">{optionalHint}</p>}
    </div>
  );
}
