import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Next Arrow (hidden on mobile)
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full shadow-lg hidden sm:flex"
  >
    <ChevronRight size={24} />
  </button>
);

// Prev Arrow (hidden on mobile)
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full shadow-lg hidden sm:flex"
  >
    <ChevronLeft size={24} />
  </button>
);

const BreakingNewsSlider = ({ articles }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg mb-8 relative">
      <Slider {...settings}>
        {articles.map((article, index) => (
          <div key={index} className="p-2">
          <div className="bg-white w-full rounded-xl shadow hover:shadow-lg transition">
            {/* Clickable Image */}
            {article.urlToImage && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-72 object-cover rounded-t-xl hover:opacity-90 transition"
                />
              </a>
            )}
        
            <div className="p-3">
              {/* Clickable Title */}
              <h2 className="mt-3 text-base sm:text-xl font-bold leading-snug line-clamp-2">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-red-400 transition-colors"
                >
                  {article.title}
                </a>
              </h2>
        
              {/* Source */}
              <p className="text-xs text-gray-500 mt-2">
                {article.source?.name || "Unknown Source"}
              </p>
        
              {/* Read More Button */}
              <div className="mt-3">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                >
                  Read More 
                </a>
              </div>
            </div>
          </div>
        </div>
        ))}
      </Slider>
    </div>
  );
};

export default BreakingNewsSlider;