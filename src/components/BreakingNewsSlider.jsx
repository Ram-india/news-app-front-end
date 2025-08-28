import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import API from "../services/axios";
// BreakingNewsSlider.jsx
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BreakingNewsSlider = () => {
  const [breakingNews, setBreakingNews] = useState([]);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const res = await API.get("/news?category=breaking"); // adjust your API
        setBreakingNews(res.data.articles || []);
      } catch (err) {
        console.error("Error fetching breaking news", err);
      }
    };
    fetchBreakingNews();
  }, []);

  return (
    <div className="bg-red-700 text-white py-4">
      <h2 className="text-xl font-bold px-6 mb-3">🚨 Breaking News</h2>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="px-6"
      >
        {breakingNews.map((news, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white text-black rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              {news.urlToImage && (
                <img
                  src={news.urlToImage}
                  alt={news.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-2">{news.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{news.description}</p>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 mt-3 inline-block hover:underline font-medium"
                >
                  Read more →
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BreakingNewsSlider;