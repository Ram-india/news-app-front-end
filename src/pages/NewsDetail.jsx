import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const NewsDetail = () => {
  const location = useLocation();
  const { id } = useParams(); //  article ID from URL
  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If no article passed via state → fetch from backend using ID
    if (!article && id) {
      const fetchArticle = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`/api/news/${id}`); //  Your backend should return a single article by ID
          setArticle(res.data);
        } catch (err) {
          console.error("Error fetching article:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchArticle();
    }
  }, [id, article]);

  if (loading) return <div>Loading...</div>;
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

      <p className="text-lg leading-relaxed mb-4">
        {article.content || article.description}
      </p>

      <p className="text-gray-600 text-sm">
        <strong>Author:</strong> {article.author || "Unknown"} |{" "}
        <strong>Published:</strong>{" "}
        {new Date(article.publishedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default NewsDetail;