import React from "react";
import UrlForm from "./UrlForm";

export default function UrlShortenerUI() {
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Quick Link</h1>
        <p className="text-gray-600 mb-8">Shorten your URL instantly.</p>
        <UrlForm />
      </div>
    </div>
  );
}
