import React, { useState } from "react";

const ellipsis = (str, max = 50) => (str.length > max ? str.slice(0, max) + "…" : str);

const RecentUrls = ({ urls }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (shortUrl, index) => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1000);  // Reset after 1 second
    }).catch(err => {
      console.error("Failed to copy: ", err);
      alert("Copy failed. Please try manually.");  // Fallback if clipboard fails
    });
  };

  if (!urls || urls.length === 0) return null;
  return (
    <div className="flex justify-center mt-20 mb-20">
      <div className="w-full max-w-2xl space-y-4">
        <h2 className="text-2xl font-bold mb-3 text-gray-800">Recent Shortened URLs</h2>
        {urls.map((u, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row items-start md:items-center bg-white rounded-2xl shadow px-6 py-4 gap-2 md:gap-6 border border-gray-100 hover:shadow-lg transition"
          >
            <div className="flex-1 break-all max-w-full">
              <span
                className="block text-gray-800 font-medium text-sm cursor-pointer truncate"
                title={u.originalUrl}
              >
                {ellipsis(u.originalUrl, 60)}
              </span>
              <a
                href={u.shortUrl}
                className="block text-purple-600 font-bold text-base hover:underline truncate"
                title={u.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ellipsis(u.shortUrl, 38)}
              </a>
            </div>
            <div className="flex items-center gap-3 md:justify-end mt-2 md:mt-0 w-full md:w-auto">
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                {u.clicks} clicks
              </span>
              <button
                className="cursor-pointer px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-800 transition"
                title="Copy short URL"
                onClick={() => handleCopy(u.shortUrl, i)}
              >
                {copiedIndex === i ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUrls;
