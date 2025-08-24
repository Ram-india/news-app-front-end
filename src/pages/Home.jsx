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
  return (
    <>
    
      <div className=' container px-4 mx-auto '>
        <div className='grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 p-4'>

        {
          loading ? (
            <p>Loading News..</p>
            ):(
              articles.map((article, index)=> <Newscard key={index} article={article}/>)
              )
        }
         </div>
      </div>
      
    </>


  )
}

export default Home