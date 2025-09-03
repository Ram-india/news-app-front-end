import React, { useEffect, useState } from 'react'
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
  const[articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPersonalizedNewsAndShuffle = async () => {
    try {
      const res = await API.get("/news/personalized");
      // If response contains { articles: [...] }
      const newsArray = Array.isArray(res.data) ? res.data : res.data.articles;
      console.log("API Response:", res.data);
      const shuffledNews = shuffleArray(newsArray || []);
      setArticles(shuffledNews);
    } catch (err) {
      console.error("Failed to fetch personalized news:", err);
    } finally {
      setLoading(false);
    }
  };
 
  
  useEffect(() => {
     // Fetch news first time
     fetchPersonalizedNewsAndShuffle();

  }, []);
   
  const sliderArticles = articles.slice(0, 5);
  const gridArticles = articles.slice(5);
  return (
    <>
      <div>
        {loading ? (
          <p>Loading News..</p>
        ) : (
          <>
           <TickerBreakingNews/>
            {/* Breaking News Slider */}
            <BreakingNewsSlider articles={sliderArticles} />
  
            {/* Articles Grid */}
            <div className="container  px-8 mx-auto">
              <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 p-4">
                {gridArticles.map((article, index) => (
                  <Newscard key={index} article={article} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home