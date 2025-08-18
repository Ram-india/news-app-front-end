// src/components/NewsCard.jsx
import React from "react";

const NewsCard = ({ article }) => {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 flex flex-col">
      {/* Thumbnail */}
      {article.urlToImage ? (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-2xl">
          <span className="text-gray-500 text-sm">No Image</span>
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category */}
        {article.category && (
          <span className="text-xs font-semibold uppercase text-blue-600 mb-2">
            {article.category}
          </span>
        )}

        {/* Title */}
        <h2 className="text-lg font-semibold mb-4 line-clamp-2">
          {article.title}
        </h2>

        {/* Footer */}
        <div className="mt-auto flex justify-between items-center text-xs text-gray-500">
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 font-medium hover:underline"
          >
            Read more →
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;