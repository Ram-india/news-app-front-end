import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [allArticles, setAllArticles] = useState([]);

  // Always load article based on ID
  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    const foundArticle = storedArticles.find((a) => a._id === id);
    setArticle(foundArticle);
    setAllArticles(storedArticles);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top on article change
  }, [id]); // runs whenever `id` changes

  if (!article) return <div className="text-center mt-6">No article found.</div>;

  const displayContent =
    article.content && !article.content.includes("[+")
      ? article.content
      : article.description || "No content available";

  // Find next article (loop back to first)
  const currentIndex = allArticles.findIndex((a) => a._id === article._id);
  const nextArticle = allArticles[currentIndex + 1] || allArticles[0];

  const handleNextNews = () => {
    navigate(`/dashboard/news/${nextArticle._id}`); // don't pass state
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-auto rounded-xl mb-4"
          />
        )}

        <p className="text-lg mb-4">{displayContent}</p>

        {article.url && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Read Full Article
          </a>
        )}

        {/* Next News Button */}
        {allArticles.length > 1 && (
          <div className="mt-6">
            <button
              onClick={handleNextNews}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Read Next News
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;