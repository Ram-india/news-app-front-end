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
        <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
        <p className="text-sm text-gray-600 mb-3">
          {article.description?.slice(0, 100)}...
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline"
          >
            Read more →
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;