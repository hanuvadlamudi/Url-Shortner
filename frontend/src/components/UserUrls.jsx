import React, { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { getUserUrls } from "../api/User.Api";

const UserUrls = ({ refresh }) => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(null);

  const copyToClipboard = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopiedUrl(shortUrl);
      setTimeout(() => setCopiedUrl(null), 1500);
    });
  };

  useEffect(() => {
    let isMounted = true;
    const fetchUrls = async () => {
      setLoading(true);
      try {
        const data = await getUserUrls();
        if (data?.success && isMounted) {
          setUrls(data.urls);
          setError(null);
        } else if (isMounted) {
          setError(data?.message || "Failed to fetch URLs");
          setUrls([]);
        }
      } catch (err) {
        if (isMounted) {
          setError("Error fetching URLs");
          setUrls([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUrls();

    // Poll every 10 seconds for real-time updates
    const intervalId = setInterval(fetchUrls, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [refresh]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Shortened URLs</h2>
      {urls.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No URLs found. Start shortening some!</p>
      ) : (
        <div className="divide-y divide-gray-200 shadow-md rounded-lg bg-white">
          {urls.map((url) => (
            <div key={url.shortUrl} className="flex items-center py-4 px-2 hover:bg-gray-50">
              {/* Original URL */}
              <div className="flex-1 min-w-0">
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:underline"
                >
                  {url.originalUrl}
                </a>
              </div>
              {/* Short URL */}
              <div className="flex-1 min-w-0 ml-4">
                <a
                  href={url.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 font-medium hover:underline"
                >
                  {url.shortUrl}
                </a>
              </div>
              {/* Clicks */}
              <div className="flex items-center ml-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {url.clicks} clicks
                </span>
              </div>
              {/* Copy Button */}
              <div className="ml-4">
                <button
                  onClick={() => copyToClipboard(url.shortUrl)}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-semibold transition focus:outline-none"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  {copiedUrl === url.shortUrl ? "Copied!" : "Copy URL"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserUrls;
