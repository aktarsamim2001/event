"use client";

import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCopy } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";
import Button from "../ui/Button";

const ShareModal = ({ isOpen, onClose, title, url }) => {
  const [copied, setCopied] = useState(false);

  // Always use the current event page URL for sharing
  const shareUrl = typeof window !== "undefined" ? (url || window.location.href) : url || "";

  // Handle escape key press to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close modal when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Event link copied to clipboard!");

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const shareOnSocial = (platform) => {
    let platformUrl = "";

    switch (platform) {
      case "facebook":
        platformUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "twitter":
        platformUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        platformUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`;
        break;
      case "instagram":
        // Instagram doesn't support direct sharing via web API
        copyToClipboard();
        toast.info(
          "Instagram sharing is not directly available. The event link has been copied to your clipboard. Paste it into an Instagram post or story to share!"
        );
        return;
      default:
        return;
    }

    if (platformUrl) {
      window.open(platformUrl, "_blank", "width=600,height=400");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white __gradient rounded-xl p-6 w-full max-w-md shadow-xl transform transition-all animate-in slide-in-from-bottom-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white font-semibold __heading">Share: {title}</h2>
          <button
            onClick={onClose}
            className="text-gray-200 hover:text-gray-900 cursor-pointer transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <RxCross2 size={20} />
          </button>
        </div>

        <div className="py-3">
          <h3 className="text-sm text-gray-300 mb-3 __text">Share via</h3>
          <div className="flex justify-around mb-6">
            <button
              onClick={() => shareOnSocial("facebook")}
              className="p-3 cursor-pointer rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              aria-label="Share on Facebook"
            >
              <FaFacebook size={24} />
            </button>
            <button
              onClick={() => shareOnSocial("twitter")}
              className="p-3 cursor-pointer rounded-full bg-gray-900 text-white hover:bg-black transition-colors"
              aria-label="Share on Twitter"
            >
              <FaXTwitter size={24} />
            </button>
            <button
              onClick={() => shareOnSocial("linkedin")}
              className="p-3 cursor-pointer rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedin size={24} />
            </button>
            <button
              onClick={() => shareOnSocial("instagram")}
              className="p-3 cursor-pointer rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white hover:opacity-90 transition-opacity"
              aria-label="Share on Instagram"
            >
              <RiInstagramFill size={24} />
            </button>
          </div>

          <div className="relative">
            <h3 className="text-sm text-gray-300 mb-2 __text">Copy link</h3>
            <div className="flex">
              <div className="flex-1 rounded-l-md truncate">
                <p className="appearance-none px-5 py-[10px] rounded-[30px] w-full block outline-none border bg-[#ffffff1b] text-white __text custom_input_component truncate">
                  {shareUrl}
                </p>
              </div>
              <Button
                onClick={copyToClipboard}
                className="text-white"
                aria-label="Copy to clipboard"
              >
                {copied ? <FaCheck size={24} /> : <IoCopy size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;