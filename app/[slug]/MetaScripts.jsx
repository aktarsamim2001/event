"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function MetaScripts() {
  const settings = useSelector((state) => state.generalSettings?.data);
  console.log("MetaScripts settings:", settings);

  const headScripts = settings?.head_scripts;
  const bodyScripts = settings?.body_scripts;
  const footerScripts = settings?.footer_scripts;
  useEffect(() => {
    if (headScripts && headScripts !== "#") {
      const script = document.createElement("script");
      script.innerHTML = headScripts;
      script.setAttribute("data-meta-script", "head");
      document.head.appendChild(script);
    }

    return () => {
      const old = document.querySelector('script[data-meta-script="head"]');
      if (old) old.remove();
    };
  }, [headScripts]);

  // Inject BODY and FOOTER scripts
  useEffect(() => {
    if (bodyScripts && bodyScripts !== "#") {
      const script = document.createElement("script");
      script.innerHTML = bodyScripts;
      script.setAttribute("data-meta-script", "body");
      document.body.appendChild(script);
    }

    if (footerScripts && footerScripts !== "#") {
      const onLoad = () => {
        const script = document.createElement("script");
        script.innerHTML = footerScripts;
        script.setAttribute("data-meta-script", "footer");
        document.body.appendChild(script);
      };

      window.addEventListener("load", onLoad);

      return () => {
        window.removeEventListener("load", onLoad);
        const oldFooter = document.querySelector(
          'script[data-meta-script="footer"]'
        );
        if (oldFooter) oldFooter.remove();

        const oldBody = document.querySelector(
          'script[data-meta-script="body"]'
        );
        if (oldBody) oldBody.remove();
      };
    }
  }, [bodyScripts, footerScripts]);

  return null;
}
