import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export const GoogleTranslate = () => {
    useEffect(() => {
        // Prevent multiple script loads
        if (document.querySelector('script[src*="translate_a/element.js"]')) {
            return;
        }

        const addScript = () => {
            const script = document.createElement("script");
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        };

        window.googleTranslateElementInit = () => {
            if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        includedLanguages: "en,zh-CN,ru,kk", // English, Chinese, Russian, Kazakh
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                        autoDisplay: false,
                    },
                    "google_translate_element"
                );
            }
        };

        addScript();

        // Style overrides to hide the default Google bar/widgets
        const style = document.createElement("style");
        style.innerHTML = `
            .goog-te-banner-frame.skiptranslate, 
            .goog-te-gadget-icon,
            #goog-gt-tt,
            .goog-tooltip,
            .goog-tooltip:hover {
                display: none !important;
            }
            body {
                top: 0 !important;
            }
            .goog-text-highlight {
                background-color: transparent !important;
                border: none !important;
                box-shadow: none !important;
            }
            #google_translate_element {
                display: none;
            }
            .goog-te-menu-value {
                display: none !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            // Clean up if needed, though usually global utilities stay mounted
        };
    }, []);

    return <div id="google_translate_element" className="hidden" />;
};

export const changeLanguage = (langCode: string) => {
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event("change"));
    }
};
