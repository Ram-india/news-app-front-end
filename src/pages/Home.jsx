import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Newscard from '../components/Newscard';
import API from '../services/axios';
import BreakingNewsSlider from '../components/BreakingNewsSlider';
import TickerBreakingNews from '../components/TickerBreakingNews';

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
      const shuffledNews = shuffleArray(newsArray || []);
      setArticles(shuffledNews);

      // Store articles in localStorage for NewsDetail page
      localStorage.setItem("articles", JSON.stringify(shuffledNews));

      console.log("✅ API Response:", shuffledNews);
    } catch (err) {
      console.error("❌ Failed to fetch personalized news:", err);
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
      {loading ? (
        <p>Loading News..</p>
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