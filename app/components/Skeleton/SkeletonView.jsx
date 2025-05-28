import React from "react";

export default function SkeletonView({ customHighlightBackground }) {
  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8" style={customHighlightBackground ? { background: customHighlightBackground } : {}}>
      <div className="__container space-y-5">
        {/* Header */}
        <div className="space-y-3">
          <div className="h-6 w-64 rounded-md bg-gray-800 transition-opacity duration-1000" />
          <div className="h-3 w-full max-w-md rounded-md bg-gray-800 transition-opacity duration-1000" />
        </div>

        {/* Content blocks */}
        <div className="space-y-4">
          <div className="h-3 w-full rounded-md bg-gray-800 transition-opacity duration-1000" />
          <div className="h-3 w-5/6 rounded-md bg-gray-800 transition-opacity duration-1000" />
          <div className="h-3 w-full rounded-md bg-gray-800 transition-opacity duration-1000" />
          <div className="h-3 w-3/4 rounded-md bg-gray-800 transition-opacity duration-1000" />
        </div>

        {/* Main image/card */}
        <div className="h-32 w-full rounded-lg bg-gray-800 transition-opacity duration-1000" />

        {/* Footer */}
        <div className="space-y-3">
          <div className="h-3 w-full rounded-md bg-gray-800 transition-opacity duration-1000" />
          <div className="h-3 w-2/3 rounded-md bg-gray-800 transition-opacity duration-1000" />
        </div>
      </div>
    </div>
  );
}
