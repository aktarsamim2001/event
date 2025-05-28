import React from "react";

const Disclaimer = ({ content }) => {
  const disclaimerContent = content?.block_page?.content || "No disclaimer content available.";
  return (
    <div className="bg-black text-white">
      <div className="__container pt-[90px]">
        <header className="mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-white __heading">{disclaimerContent?.title}</h1>
          <p className="mt-2 text-gray-300 __text">
            {disclaimerContent?.content}
          </p>
        </header>

        <section className="space-y-8">
          <div
            className="rounded-lg mt-12 text-gray-300"
            dangerouslySetInnerHTML={{
              __html: disclaimerContent?.page_content || "No content available.",
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default Disclaimer;