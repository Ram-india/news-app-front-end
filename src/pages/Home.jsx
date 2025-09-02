import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Newscard from '../components/Newscard';
import API from '../services/axios';
import BreakingNewsSlider from '../components/BreakingNewsSlider';
import TickerBreakingNews from '../components/TickerBreakingNews';



const Home = () => {
  const[articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPersonalizedNews = async () => {
    try {
      const res = await API.get("/news/personalized");
      console.log("API Response:", res.data); 
      setArticles(res.data.articles || []);
    } catch (err) {
      console.error("Failed to fetch personalized news:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPersonalizedNews();
  }, []);
   // Breakpoints for masonry
   const breakpointColumnsObj = {
    default: 3, // 3 columns on large screens
    1100: 2,    // 2 columns on medium
    700: 1      // 1 column on small
  };
  return (
    <>
      <div>
        {loading ? (
          <p>Loading News..</p>
        ) : (
          <>
           <TickerBreakingNews/>
            {/* Breaking News Slider */}
            <BreakingNewsSlider articles={articles} />
  
            {/* Articles Grid */}
            <div className="container  px-8 mx-auto">
              <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 p-4">
                {articles.map((article, index) => (
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