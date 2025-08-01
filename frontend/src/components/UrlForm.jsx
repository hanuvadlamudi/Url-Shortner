import React, { useState } from "react";
import axios from "axios";

const UrlForm = ({ disabledInput = false, disabledButton = false, onSubmit }) => {
  const [url, setUrl] = useState("https://www.google.com");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const changeHandler = (e) => {
    setUrl(e.target.value);
  };

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
      setTimeout(() => {
        setCopied(false);
      }, 1000); 
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Enter your URL"
        required={true}
        value={url}
        onChange={changeHandler}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
        disabled={disabledInput}
      />
      <button
        type="submit"
        disabled={disabledButton}
        className="cursor-pointer w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate Link
      </button>

      {shortUrl && (
        <div className="flex items-center mt-4 space-x-3 bg-gray-100 rounded-lg p-3">
          <input
            type="text"
            readOnly
            value={shortUrl}
            className="flex-1 bg-transparent border-none outline-none text-gray-900 font-medium cursor-pointer"
            onClick={(e) => e.target.select()}
          />
          <button
            type="button"
            onClick={copyToClipboard}
            className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors ${
              copied ? "bg-green-500" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </form>
  );
};

export default UrlForm;
