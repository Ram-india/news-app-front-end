// Home.jsx
import { useEffect, useState } from "react";
import API from "../services/axios";
import Newscard from "../components/Newscard";
import Masonry from "react-masonry-css";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await API.get("/v1/news"); // your backend endpoint
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    fetchNews();
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

export default Home;