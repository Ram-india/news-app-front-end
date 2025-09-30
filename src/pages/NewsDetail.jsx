import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [article, setArticle] = useState(location.state?.article || null);
  const [allArticles, setAllArticles] = useState(location.state?.allArticles || []);

  // Load article if user refreshes the page
  useEffect(() => {
    if (!article && id) {
      const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
      const foundArticle = storedArticles.find((a) => a._id === id);
      setArticle(foundArticle);
      setAllArticles(storedArticles);
    }
  }, [id, article]);

  if (!article) return <div>No article found.</div>;

  // Display content, fallback to description if truncated
  const displayContent =
    article.content && !article.content.includes("[+")
      ? article.content
      : article.description || "No content available";

  // Related articles by category, exclude current article
  const relatedArticles = allArticles.filter(
    (a) => a._id !== article._id && a.category === article.category
  );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Main article */}
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>

      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-96 object-cover mb-4 rounded-xl"
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

      <p className="text-gray-600 text-sm mt-4">
        <strong>Author:</strong> {article.author || "Unknown"} |{" "}
        <strong>Published:</strong>{" "}
        {new Date(article.publishedAt).toLocaleString()}
      </p>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-8 mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel._id}
                onClick={() =>
                  navigate(`/dashboard/news/${rel._id}`, {
                    state: { article: rel, allArticles },
                  })
                }
                className="cursor-pointer bg-white shadow-md rounded p-2 hover:shadow-lg transition"
              >
                {rel.urlToImage && (
                  <img
                    src={rel.urlToImage}
                    alt={rel.title}
                    className="w-full h-32 object-cover rounded"
                  />
                )}
                <h3 className="text-sm font-semibold mt-2 line-clamp-2">{rel.title}</h3>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NewsDetail;