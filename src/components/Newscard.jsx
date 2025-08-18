// src/components/NewsCard.jsx
import React from "react";

const NewsCard = ({ article }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        {/* Category */}
        {article.source?.name && (
          <span className="text-xs uppercase tracking-wide text-gray-500">
            {article.source.name}
          </span>
        )}

        {/* Title */}
        <h2 className="text-lg font-semibold mt-1 line-clamp-2">
          {article.title}
        </h2>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500 mt-3">
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline"
          >
            Read →
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;