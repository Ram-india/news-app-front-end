import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import RelatedArticlesSlider from "../components/RelatedArticlesSlider";
import API from "../services/axios";

const NewsDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const [article, setArticle] = useState(location.state?.article || null);
  const [allArticles, setAllArticles] = useState(location.state?.allArticles || []);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    if (article?.category) {
      const fetchRelated = async () => {
        try {
          const res = await API.get(`/news/related?category=${article.category}`);
          //  Use this state instead of redefining
          setRelatedArticles(
            res.data.articles.filter((a) => a._id !== article._id)
          );
        } catch (err) {
          console.error("Failed to fetch related articles:", err);
        }
      };
      fetchRelated();
    }
  }, [article]);

  useEffect(() => {
    if (!article && id) {
      const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
      const foundArticle = storedArticles.find((a) => a._id === id);
      setArticle(foundArticle);
      setAllArticles(storedArticles);
    }
  }, [id, article]);

  if (!article) return <div>No article found.</div>;

  const displayContent =
    article.content && !article.content.includes("[+")
      ? article.content
      : article.description || "No content available";

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
      </div>

      {relatedArticles.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
          <RelatedArticlesSlider articles={relatedArticles} />
        </div>
      )}
    </div>
  );
};

export default NewsDetail;