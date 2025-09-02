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
    <div className="p-4">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="bg-clip-padding"
      >
        {articles.map((article, index) => (
          <Newscard key={index} article={article} />
        ))}
      </Masonry>
    </div>
  );
};

export default Home