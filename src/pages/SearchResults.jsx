import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/axios";

export default function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      API.get(`/news/search?query=${query}`)
        .then((res) => {
          setResults(res.data.articles || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [query]);

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {results.length === 0 && (
        <p className="text-gray-500">No results found.</p>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {results.map((news, idx) => (
          <Link
            to={news.url} // Since NewsAPI returns external URLs
            target="_blank"
            rel="noopener noreferrer"
            key={idx}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={news.urlToImage || "/placeholder.jpg"}
              alt={news.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg line-clamp-2">
                {news.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {news.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}