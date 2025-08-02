import React, { useState } from "react";
import axios from "axios";

const UrlShortenerUI = ({ disabledInput = false, disabledButton = false, onSubmit }) => {
  
  const [url, setUrl] = useState("https://www.google.com/");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const changeHandler = (e) => setUrl(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/create", { url });
      setShortUrl(data);
      if (onSubmit) onSubmit(data);
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  };

  const copyToClipboard = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <form
      className="flex flex-col items-center gap-5 w-full max-w-md bg-white rounded-2xl shadow-lg px-6 py-10"
      onSubmit={submitHandler}
    >
      <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-1">
        URL Shortener
      </h1>
      <div className="text-pink-600 text-base font-medium text-center mb-3">
        Minimal, bright, fast.
      </div>
      <input
        type="text"
        placeholder="Paste your link"
        required
        value={url}
        onChange={changeHandler}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800 text-base"
        disabled={disabledInput}
      />
      <button
        type="submit"
        disabled={disabledButton}
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base rounded-lg transition disabled:opacity-50"
      >
        Shorten URL
      </button>
      {shortUrl && (
        <div className="flex items-center w-full bg-gray-100 rounded-lg p-3 mt-1">
          <input
            type="text"
            readOnly
            value={shortUrl}
            className="flex-1 bg-transparent border-none outline-none text-gray-900 font-medium"
            onClick={(e) => e.target.select()}
          />
          <button
            type="button"
            onClick={copyToClipboard}
            className={`px-4 py-2 rounded-lg text-white font-semibold ml-2 transition-colors ${
              copied ? "bg-green-500" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      <div className="text-purple-400 text-xs mt-2 text-center font-medium">
        No ads • No clutter • 100% free
      </div>
    </form>
  );
};

export default UrlShortenerUI;
