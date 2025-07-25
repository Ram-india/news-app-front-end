import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Newscard from '../components/Newscard';
import API from '../services/axios';

const Home = () => {
  const[articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPersonalizedNews = async () => {
    try {
      const res = await API.get("/news/personalized");
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
  return (
    <>
    
      <div className='grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-4'>
        {
          loading ? (
            <p>Loading News..</p>
          ):(
            articles.map((article, index)=> <Newscard key={index} article={article}/>)
          )
        }
      </div>
    </>


  )
}

export default Home