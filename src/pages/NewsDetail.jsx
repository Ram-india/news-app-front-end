import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import BreakingNewsSlider from "../components/BreakingNewsSlider";
import Newscard from "../components/Newscard";

const NewsDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [article, setArticle] = useState(location.state?.article || null);
  const [allArticles, setAllArticles] = useState(location.state?.allArticles || []);

  // Load article if page refreshed
  useEffect(() => {
    if (!article && id) {
      const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
      const foundArticle = storedArticles.find((a) => a._id === id);
      setArticle(foundArticle);
      setAllArticles(storedArticles);
    }
  }, [id, article]);

  if (!article) return <div>No article found.</div>;

  // Full content
  const displayContent =
    article.content && !article.content.includes("[+")
      ? article.content
      : article.description || "No content available";

  // Related articles: same category, excluding current
  const relatedArticles = allArticles.filter(
    (a) => a._id !== article._id && a.category?.toLowerCase() === article.category?.toLowerCase()
  );

  // Top slider articles (trending): exclude current
  const sliderArticles = allArticles.filter(a => a._id !== article._id).slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Article Title */}
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      {/* Top Slider (Trending News) */}
      {sliderArticles.length > 0 && (
        <div className="my-6">
          <h2 className="text-xl font-semibold mb-2">Trending News</h2>
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

      {/* Source Link */}
      {article.url && (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline mb-4 block"
        >
          Read Full Article
        </a>
      )}

      {/* Author & Published */}
      <p className="text-gray-600 text-sm mb-6">
        <strong>Author:</strong> {article.author || "Unknown"} |{" "}
        <strong>Published:</strong> {new Date(article.publishedAt).toLocaleString()}
      </p>

      {/* Related Articles Slider */}
      {relatedArticles.length > 0 && (
        <div className="my-6">
          <h2 className="text-xl font-semibold mb-2">Related Articles</h2>
          <BreakingNewsSlider articles={relatedArticles} />
        </div>
      )}
    </div>
  );
};

export default NewsDetail;