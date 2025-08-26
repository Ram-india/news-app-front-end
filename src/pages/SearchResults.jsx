import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/axios";

export default function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      // Example API call
      API.get(`/news/search?query=${query}`)
        .then((res) => setResults(res.data.articles))
        .catch((err) => console.error(err));
    }
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-4">
      <h1 className="text-xl font-bold mb-4">Search Results for: {query}</h1>
      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((article) => (
            <li key={article._id} className="border p-4 rounded-lg">
              <h2 className="text-lg font-semibold">{article.title}</h2>
              <p>{article.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}