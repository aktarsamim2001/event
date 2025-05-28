import React from "react";

const PrivacyPolicy = ({content}) => {
  const privacyPolicyContent = content?.block_page?.content || "No privacy policy content available.";
  return (
    <div className="bg-black text-white">
      <div className="__container __responsive_gapY">
        <header className="mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-white __heading">{privacyPolicyContent?.title}</h1>
          <p className="mt-2 text-gray-300 __text">
            {privacyPolicyContent?.content}
          </p>
        </header>

        <section className="space-y-6">
        <div
            className="rounded-lg mt-12 text-gray-300"
            dangerouslySetInnerHTML={{
              __html: privacyPolicyContent?.page_content || "No content available.",
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;