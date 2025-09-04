import React from "react";
import { formatDate } from "../utils/formatDate";

const categoryColors = {
  Technology: "bg-blue-100 text-blue-700",
  Sports: "bg-green-100 text-green-700",
  Politics: "bg-red-100 text-red-700",
  Business: "bg-yellow-100 text-yellow-700",
  Science: "bg-purple-100 text-purple-700",
  Entertainment: "bg-pink-100 text-pink-700",
  Health: "bg-teal-100 text-teal-700",
  Default: "bg-gray-100 text-gray-700",
};

const normalizeCategory = (category) => {
  if (!category) return "Default";
  // Capitalize first letter, lowercase the rest
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

const Newscard = ({ article }) => {
  const normalizedCategory = normalizeCategory(article.category);
  const categoryClass = categoryColors[normalizedCategory] || categoryColors["Default"];

  return (
    <a
      href={article.url} 
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="bg-white p-2 shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition duration-300 cursor-pointer">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-40 object-cover"
          />
        )}

        <div className="">
          {article.category && (
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${categoryClass}`}
            >
              {normalizedCategory}
            </span>
          )}

          <h2 className="mt-2 text-sm font-bold text-gray-800 line-clamp-2">
            {article.title}
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            <span className="bg-gray-300 rounded px-2">
              {article.source?.name || "Unknown Source"}
            </span>{" "}
            • {formatDate(article.publishedAt)}
          </p>
        </div>
      </div>
    </a>
  );
};

export default Newscard;