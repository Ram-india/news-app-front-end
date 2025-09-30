import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [article, setArticle] = useState(location.state?.article || null);

  useEffect(() => {
    if (!article && id) {
      const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
      const foundArticle = storedArticles.find((a) => a._id === id);
      setArticle(foundArticle);
    }
  }, [id, article]);

  if (!article) return <div>No article found.</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-96 object-cover mb-4 rounded-xl"
        />
      )}
      <p className="text-lg mb-4">{article.content || article.description}</p>
      <p className="text-gray-600 text-sm">
        <strong>Author:</strong> {article.author || "Unknown"} |{" "}
        <strong>Published:</strong> {new Date(article.publishedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default NewsDetail;