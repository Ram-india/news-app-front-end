import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/axios"; // Your Axios instance

export default function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      API.get(`/news/search?query=${query}`)
        .then((res) => {
          // Adjust based on API response structure
          setResults(res.data.articles || []);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-500">No results found.</p>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {results.map((news) => (
          <Link
            to={`/dashboard/article/${news._id}`} // Adjust route if needed
            key={news._id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-md transition"
          >
            <img
              src={news.imageUrl || "/placeholder.jpg"}
              alt={news.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{news.title}</h2>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {news.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}