import React from "react";

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

const Newscard = ({ article }) => {
  const categoryClass =
    categoryColors[article.category] || categoryColors["Default"];

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
      {/* Image */}
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-40 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-3">
        {/* Category Badge */}
        {article.category && (
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${categoryClass}`}
          >
            {article.category}
          </span>
        )}

        {/* Title */}
        <h2 className="mt-2 text-sm font-bold text-gray-800 line-clamp-2">
          {article.title}
        </h2>
      </div>
    </div>
  );
};

export default Newscard;