import { useEffect, useState } from "react";
import { Loader, ShieldAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_API_URL } from "@/services/api";

export type DeleteOtpResourceType =
  | "estate"
  | "unit"
  | "tenant"
  | "business_owner"
  | "manager"
  | "vendor";

interface DeleteConfirmOtpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resourceType: DeleteOtpResourceType;
  resourceId: string;
  resourceLabel: string;
  /** Performs the actual delete using the confirmed code. Throw with a
   * message to surface an inline error instead of closing the dialog. */
  onConfirm: (otpId: string, otpCode: string) => Promise<void>;
}

/** Deleting an estate, unit, tenant, or staff/vendor account requires a code
 * sent to the owner's phone + email — this dialog requests that code on open
 * and won't call onConfirm until a valid one is entered. Reused across every
 * business-critical delete rather than rebuilt per page. */
export function DeleteConfirmOtp({
  open,
  onOpenChange,
  resourceType,
  resourceId,
  resourceLabel,
  onConfirm,
}: DeleteConfirmOtpProps) {
  const [requesting, setRequesting] = useState(false);
  const [otpId, setOtpId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  const requestOtp = async () => {
    setRequesting(true);
    setError(null);
    setCode("");
    setOtpId(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_API_URL}/api/admin/delete-otp/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ resourceType, resourceId }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.detail || "Couldn't send a confirmation code");
      setOtpId(json?.data?.otpId || null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't send a confirmation code");
    } finally {
      setRequesting(false);
    }
  };

  useEffect(() => {
    if (open) {
      void requestOtp();
    } else {
      setOtpId(null);
      setCode("");
      setError(null);
      setConfirming(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, resourceType, resourceId]);

  const handleConfirm = async () => {
    if (!otpId || code.trim().length !== 6) return;
    setConfirming(true);
    setError(null);
    try {
      await onConfirm(otpId, code.trim());
      onOpenChange(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't confirm deletion");
    } finally {
      setConfirming(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !confirming && onOpenChange(v)}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-destructive" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            Deleting <strong>{resourceLabel}</strong> requires owner confirmation. A 6-digit
            code has been sent to the owner's phone and email — enter it below to proceed.
            This cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {requesting ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            <Loader className="h-4 w-4 animate-spin inline mr-2" />
            Sending confirmation code&hellip;
          </div>
        ) : (
          <div className="space-y-2">
            <Input
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              inputMode="numeric"
              autoFocus
              disabled={!otpId || confirming}
            />
            <div className="flex items-center justify-between">
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button
                type="button"
                variant="link"
                size="sm"
                className="px-0 ml-auto"
                onClick={requestOtp}
                disabled={requesting || confirming}
              >
                Resend code
              </Button>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={confirming}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!otpId || code.length !== 6 || confirming}
          >
            {confirming ? <Loader className="h-4 w-4 animate-spin mr-1.5" /> : null}
            {confirming ? "Deleting…" : "Confirm Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
