"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function MetaScripts() {
  const settings = useSelector((state) => state.generalSettings?.data);

  // Extract only inner content of <script>...</script>
  const extractScriptContent = (rawScript) => {
    if (!rawScript || rawScript.trim() === "#" || rawScript.trim() === "") return null;

    const match = rawScript.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    return match ? match[1].trim() : rawScript.trim();
  };

  const headScriptContent = extractScriptContent(settings?.head_scripts);
  const bodyScriptContent = extractScriptContent(settings?.body_scripts);
  const footerScriptContent = extractScriptContent(settings?.footer_scripts);

  // Inject HEAD script
  useEffect(() => {
    if (headScriptContent) {
      const script = document.createElement("script");
      script.textContent = headScriptContent;
      script.setAttribute("data-meta-script", "head");
      document.head.appendChild(script);
    } 

    return () => {
      const old = document.querySelector('script[data-meta-script="head"]');
      if (old) old.remove();
    };
  }, [headScriptContent]);

  // Inject BODY and FOOTER scripts
  useEffect(() => {
    if (bodyScriptContent) {
      const script = document.createElement("script");
      script.textContent = bodyScriptContent;
      script.setAttribute("data-meta-script", "body");
      document.body.appendChild(script);
    } 
    const onLoad = () => {
      if (footerScriptContent) {
        const script = document.createElement("script");
        script.textContent = footerScriptContent;
        script.setAttribute("data-meta-script", "footer");
        document.body.appendChild(script);
      }
    };

    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      const oldFooter = document.querySelector('script[data-meta-script="footer"]');
      if (oldFooter) oldFooter.remove();

      const oldBody = document.querySelector('script[data-meta-script="body"]');
      if (oldBody) oldBody.remove();
    };
  }, [bodyScriptContent, footerScriptContent]);

  return null;
}
