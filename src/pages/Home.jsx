import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Newscard from "../components/Newscard";
import API from "../services/axios";
import BreakingNewsSlider from "../components/BreakingNewsSlider";
import TickerBreakingNews from "../components/TickerBreakingNews";
import CategorySelector from "../components/CategorySelector";
import { v4 as uuidv4 } from "uuid";

// Shuffle Function
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCategories, setUserCategories] = useState([]);

  // Fetch news based on selected categories
  const fetchPersonalizedNews = async (cats) => {
    if (!cats || cats.length === 0) return;

    try {
      setLoading(true);

      const res = await API.get(
        `/news/personalized?categories=${cats.join(",")}`
      );

      const newsArray = Array.isArray(res.data) ? res.data : res.data.articles;

      // Assign unique ID
      const articlesWithId = newsArray.map((article) => ({
        ...article,
        _id: article._id || uuidv4(),
      }));

      const shuffled = shuffleArray(articlesWithId);

      setArticles(shuffled);

      localStorage.setItem("articles", JSON.stringify(shuffled));
    } catch (err) {
      console.error("Failed to fetch personalized news:", err);
    } finally {
      setLoading(false);
    }
  };

  // When categories change → fetch news
  useEffect(() => {
    if (userCategories.length > 0)
      fetchPersonalizedNews(userCategories);
  }, [userCategories]);

  const tickerArticles = articles.slice(0, 2);
  const sliderArticles = articles.slice(3, 7);
  const gridArticles = articles.slice(7);

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 mt-4">
        <h2 className="text-xl font-bold mb-3">Your News Preferences</h2>

        {/* Category Selector Component */}
        <CategorySelector onChange={setUserCategories} />
      </div>

      {loading ? (
        <p className="text-center mt-6">Loading News...</p>
      ) : (
        <>
          <TickerBreakingNews articles={tickerArticles} />
          <div className="container px-8 mx-auto">
            <BreakingNewsSlider articles={sliderArticles} />
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 p-4">
              {gridArticles.map((article) => (
                <Newscard key={article._id} article={article} allArticles={articles} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;