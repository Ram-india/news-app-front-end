import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import BreakingNewsSlider from "../components/BreakingNewsSlider";

const NewsDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [article, setArticle] = useState(location.state?.article || null);
  const [allArticles, setAllArticles] = useState(location.state?.allArticles || []);

  // Load article if page is refreshed
  useEffect(() => {
    if (!article && id) {
      const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
      const foundArticle = storedArticles.find((a) => a._id === id);
      setArticle(foundArticle);
      setAllArticles(storedArticles);
    }
  }, [id, article]);

  if (!article) return <div>No article found.</div>;

  // Full content display
  const displayContent =
    article.content && !article.content.includes("[+")
      ? article.content
      : article.description || "No content available";

  // Related articles
  const relatedArticles = allArticles.filter(
    (a) => a._id !== article._id && a.category === article.category
  );

  // Slider articles (exclude current)
  const sliderArticles = allArticles.filter(a => a._id !== article._id).slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>

      {/* News Slider */}
      {sliderArticles.length > 0 && (
        <div className="my-6">
          <BreakingNewsSlider articles={sliderArticles} />
        </div>
      )}

      {/* Main Image */}
      {article.urlToImage && (
        <div className="w-full max-w-4xl mx-auto mb-4">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-auto rounded-xl"
          />
        </div>
      )}

      {/* Full Content */}
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
        <strong>Published:</strong> {new Date(article.publishedAt).toLocaleString()}
      </p>

      {/* Related Articles */}
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
                    className="w-full h-auto rounded"
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