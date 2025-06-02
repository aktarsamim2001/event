"use client";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export default function AppScrollWrapper({ children }) {
  return (
    <SimpleBar className="custom-scroll" style={{ maxHeight: "100vh" }}>
      {children}
    </SimpleBar>
  );
}
