import React, { useState } from "react";
import { useSelector } from "react-redux";
import { shorten } from "../api/Shortner.api";

const UrlShortenerUI = ({ onUrlAdded }) => {
  
  const [url, setUrl] = useState("https://www.google.com/");
  const [customSlug, setCustomSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const changeHandler = (e) => setUrl(e.target.value);
  const customSlugChangeHandler = (e) => setCustomSlug(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isAuthenticated && customSlug) data = await shorten(url, customSlug);
      else data = await shorten(url);
      if (data) {
        setShortUrl(data);
        if (typeof onUrlAdded === 'function') onUrlAdded(data, url);
      }
    } catch (error) { console.error("Error creating short URL:", error); }
  };

  const copyToClipboard = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white pt-24">
      <div className="flex flex-col items-center gap-6 w-full max-w-md bg-white rounded-3xl shadow-2xl px-8 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-2">URL Shortener</h1>
        <form className="w-full flex flex-col items-center gap-4" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Paste your link"
            required
            value={url}
            onChange={changeHandler}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-800 text-base transition"
          />
          {isAuthenticated && (
            <input
              type="text"
              placeholder="Enter custom slug (optional)"
              value={customSlug}
              onChange={customSlugChangeHandler}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-800 text-base transition"
            />
          )}
          <button
            type="submit"
            className="cursor-pointer w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base rounded-xl transition shadow-md"
          >
            Shorten URL
          </button>
        </form>
        {shortUrl && (
          <div className="flex items-center w-full bg-gray-100 rounded-xl p-3 mt-2 shadow-inner">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 bg-transparent border-none outline-none text-gray-900 font-medium truncate"
              onClick={(e) => e.target.select()}
            />
            <button
              type="button"
              onClick={copyToClipboard}
              className={`cursor-pointer px-4 py-2 rounded-xl text-white font-semibold ml-2 transition-colors shadow-md ${
                copied ? "bg-green-500" : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
        <div className="text-purple-500 text-sm mt-4 text-center font-medium">
          No ads • No clutter • 100% free
        </div>
      </div>
    </div>
  );
};

export default UrlShortenerUI;
