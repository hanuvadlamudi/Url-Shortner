import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Copy } from "lucide-react";
import { getUserUrls } from "../api/User.Api";

const UserUrls = ({ onDataFetched }) => {
  /* --------------------------- state & helpers --------------------------- */
  const [urls, setUrls]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(null);

  const copyToClipboard = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopiedUrl(shortUrl);
      setTimeout(() => setCopiedUrl(null), 1500);
    });
  };

  /* ------------------------------ data fetch ----------------------------- */
  useEffect(() => {
    let mounted = true;

    const fetchUrls = async () => {
      setLoading(true);
      try {
        const data = await getUserUrls();
        if (!mounted) return;

        if (data?.success) {
          setUrls(data.urls);
          setError(null);
          const urlsCount = data.urls.length;
          const clicksCount = data.urls.reduce((acc, u) => acc + (u.clicks ?? 0), 0);
          onDataFetched(urlsCount, clicksCount);
        } else {
          setUrls([]);
          setError(data?.message || "Failed to fetch URLs");
          onDataFetched(0, 0);
        }
      } catch {
        if (mounted) {
          setUrls([]);
          setError("Error fetching URLs");
          onDataFetched(0, 0);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUrls();
    const id = setInterval(fetchUrls, 10_000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);  // Changed to empty dependency array to fix 'refresh is not defined' error; polling handles refreshes

  /* ------------------------------ early states --------------------------- */
  if (loading) return <div className="text-center py-20">Loading…</div>;
  if (error)   return <div className="text-center py-20 text-red-500">{error}</div>;

  /* -------------------------------- render ------------------------------- */
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* SUMMARY CARD : gap above nav = mt-24, small gap below = mb-4 */}

      {/* SECTION TITLE */}
      <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-12 tracking-tight">
        My Links Library
        <span className="block mt-3 w-24 h-1 bg-indigo-600 mx-auto rounded" />
      </h2>

      {/* URL LIST */}
      {urls.length === 0 ? (
        <div className="text-center text-gray-400 text-lg py-20 border rounded-xl">
          No URLs found. Start shortening some!
        </div>
      ) : (
        <ul className="space-y-6">
          {urls.map((url, idx) => (
            <li
              key={url.shortUrl}
              className="flex flex-col md:flex-row md:items-center gap-4 bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-5 hover:shadow-md transition"
            >
              {/* index */}
              <div className="flex-shrink-0">
                <span className="h-9 w-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-semibold">
                  {idx + 1}
                </span>
              </div>

              {/* URLs */}
              <div className="flex-1 min-w-0">
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-700 truncate hover:underline"
                  title={url.originalUrl}
                >
                  {url.originalUrl}
                </a>
                <a
                  href={url.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base font-medium text-indigo-600 truncate hover:underline mt-0.5"
                  title={url.shortUrl}
                >
                  {url.shortUrl}
                </a>
              </div>

              {/* actions */}
              <div className="flex items-center gap-4 md:gap-6">
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                  {url.clicks} {url.clicks === 1 ? "click" : "clicks"}
                </span>
                <button
                  onClick={() => copyToClipboard(url.shortUrl)}
                  className={`cursor-pointer flex items-center gap-1 border-2 rounded-md px-3 py-1.5 text-sm font-semibold transition
                    ${
                      copiedUrl === url.shortUrl
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                    }`}
                >
                  <Copy className="h-4 w-4" />
                  {copiedUrl === url.shortUrl ? "Copied" : "Copy"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserUrls;
