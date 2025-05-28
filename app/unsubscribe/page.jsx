import { Suspense } from "react";
import UnsubscribePageClient from "../components/Footer/UnsubscribePageClient";

export default function Unsubscribe() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <UnsubscribePageClient />
    </Suspense>
  );
}
