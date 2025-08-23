import React, { useState } from "react";
import { useSelector } from "react-redux";
import { shorten } from "../api/Shortner.api";

const UrlShortenerUI = ({ onUrlAdded }) => {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const changeHandler = (e) => setUrl(e.target.value);
  const customSlugChangeHandler = (e) => setCustomSlug(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let data;
      if (isAuthenticated && customSlug) data = await shorten(url, customSlug);
      else data = await shorten(url);
      if (data) {
        setShortUrl(data);
        if (typeof onUrlAdded === "function") onUrlAdded(data, url);
        setUrl("");
        setCustomSlug("");
      }
    } catch (error) {
      console.error("Error creating short URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-20">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-lg font-bold text-white">T</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Shorten Your URLs</h1>
            <p className="text-white/70 text-sm">Transform long URLs into short links</p>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6">
            <form onSubmit={submitHandler} className="space-y-4">
              {/* URL Input */}
              <div>
                <label className="text-xs font-medium text-white/90 mb-1 block">Enter URL</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  required
                  value={url}
                  onChange={changeHandler}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm"
                />
              </div>

              {/* Custom Slug (if authenticated) */}
              {isAuthenticated && (
                <div>
                  <label className="text-xs font-medium text-white/90 mb-1 block">Custom alias (optional)</label>
                  <input
                    type="text"
                    placeholder="my-link"
                    value={customSlug}
                    onChange={customSlugChangeHandler}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !url}
                className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 shadow-lg transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Shortening...</span>
                  </div>
                ) : (
                  'Shorten URL'
                )}
              </button>
            </form>

            {/* Result */}
            {shortUrl && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-400/30 rounded-lg">
                <div className="flex items-center space-x-2 bg-white/5 rounded-lg p-3">
                  <input
                    type="text"
                    readOnly
                    value={shortUrl}
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm truncate cursor-pointer"
                    onClick={(e) => e.target.select()}
                  />
                  <button
                    onClick={copyToClipboard}
                    className={`cursor-pointer px-3 py-1.5 rounded text-xs font-medium transition-all ${
                      copied 
                        ? "bg-green-500 text-white" 
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Simple features */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-xs">Fast • Free • No ads</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlShortenerUI;
