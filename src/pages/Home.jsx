import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Newscard from "../components/Newscard";
import API from "../services/axios";
import BreakingNewsSlider from "../components/BreakingNewsSlider";
import TickerBreakingNews from "../components/TickerBreakingNews";
import { v4 as uuidv4 } from "uuid";

// Fisher–Yates Shuffle
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

  const fetchPersonalizedNewsAndShuffle = async () => {
    try {
      const res = await API.get("/news/personalized");
      const newsArray = Array.isArray(res.data) ? res.data : res.data.articles;
      console.log("API Response:", res.data);

      // Add unique ID to each article
      const articlesWithId = (newsArray || []).map((article) => ({
        ...article,
        _id: uuidv4(),
      }));

      const shuffledNews = shuffleArray(articlesWithId);
      setArticles(shuffledNews);

      // Store in localStorage for refresh
      localStorage.setItem("articles", JSON.stringify(shuffledNews));
    } catch (err) {
      console.error("Failed to fetch personalized news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalizedNewsAndShuffle();
  }, []);

  const tickerArticles = articles.slice(0, 2);
  const sliderArticles = articles.slice(3, 7);
  const gridArticles = articles.slice(7);

  return (
    <>
     
      <div>
        {loading ? (
          <p>Loading News...</p>
        ) : (
          <>
            <TickerBreakingNews articles={tickerArticles} />
            <BreakingNewsSlider articles={sliderArticles} />
            <div className="container px-8 mx-auto">
              <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 p-4">
                {gridArticles.map((article) => (
                  <Newscard key={article._id} article={article} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;