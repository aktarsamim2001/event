"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "../ui/Button";

const UnsubscribePageClient = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const rootUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // Auto-process unsubscribe if email is provided in URL
    if (email) {
      handleUnsubscribe();
    }
  }, [email]);

  const handleUnsubscribe = async () => {
    if (!email) {
      setError("No email address provided.");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const response = await fetch(`${rootUrl}api/web/subscription/unsubscribe?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to unsubscribe.");
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err.message || "Unsubscription failed. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Newsletter Unsubscribe</h1>
        
        {isProcessing ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4">Processing your request...</p>
          </div>
        ) : isSuccess ? (
          <div className="text-center py-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Unsubscribed Successfully</h3>
            <p className="mt-2 text-sm text-gray-500">
              You have been successfully unsubscribed from our newsletter.
            </p>
            <div className="mt-6">
              <Button
                varient="fill"
                onClick={() => window.location.href = "/"}
                className="mx-auto"
              >
                Return to Home
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {!email ? (
              <div className="text-center py-4">
                <p className="text-red-500 mb-4">No email address found in the URL.</p>
                <p className="mb-4">
                  To unsubscribe, please click the unsubscribe link in the emails you received from us.
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Error</h3>
                <p className="mt-2 text-sm text-red-500">{error}</p>
                <div className="mt-6">
                  <Button
                    varient="fill"
                    onClick={handleUnsubscribe}
                    className="mx-auto"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="mb-4">
                  Are you sure you want to unsubscribe {email} from our newsletter?
                </p>
                <div className="mt-6 flex space-x-4 justify-center">
                  <Button
                    varient="fill"
                    onClick={handleUnsubscribe}
                  >
                    Yes, Unsubscribe
                  </Button>
                  <Button
                    varient="outline"
                    onClick={() => window.location.href = "/"}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnsubscribePageClient;