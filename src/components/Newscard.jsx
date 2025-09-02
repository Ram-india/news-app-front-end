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
    <a
      href={article.url} // ensure your article object has a `url` field
      target="_blank"
      rel="noopener noreferrer"
      className="block" // makes the link behave like a block container
    >
      <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition duration-300 cursor-pointer">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-40 object-cover"
          />
          )}
          

        <div className="p-3">
          {article.preferences && (
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${categoryClass}`}
            >
              {article.preferences}
            </span>
          )}

          <h2 className="mt-2 text-sm font-bold text-gray-800 line-clamp-2">
            {article.title}
          </h2>

          {article.publishedAt && (
            <div className="text-xs text-gray-500 mt-1 flex items-center justify-between">
              <div> {new Date(article.publishedAt).toLocaleDateString()}</div>
             <div> {article.source?.name || "Unknown Source"} </div> 
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

export default Newscard;