"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    // Target SimpleBar's scrollable container
    const scrollContainer = document.querySelector(
      ".custom-scroll .simplebar-content-wrapper"
    );
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollToTop;
