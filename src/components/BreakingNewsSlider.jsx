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
    aria-label="Next slide"
  >
    <ChevronRight size={24} />
  </button>
);

// Prev Arrow (hidden on mobile)
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full shadow-lg hidden sm:flex"
    aria-label="Previous slide"
  >
    <ChevronLeft size={24} />
  </button>
);

const BreakingNewsSlider = ({ articles }) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    lazyLoad: "ondemand",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  

  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg mb-8 mt-8 relative"
      aria-label="Breaking news slider"
    >
      <Slider {...settings}>
        {articles.map((article, index) => (
          <div key={index} className="p-2">
            <div className="bg-white w-full rounded-xl shadow hover:shadow-lg transition flex flex-col">
              {/* Clickable Image */}
              {article.urlToImage && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={article.urlToImage}
                    alt={article.title || "News image"}
                    className="w-full h-48 sm:h-64 md:h-72 object-cover rounded-t-xl hover:opacity-90 transition"
                  />
                </a>
              )}

              {/* Content */}
              <div className="p-3 flex flex-col flex-1">
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

                <p className="text-xs text-gray-500 mt-2">
                  {article.source?.name || "Unknown Source"}
                </p>

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

      {/* Custom slick dots styling */}
      <style jsx global>{`
        .slick-dots {
          bottom: 10px;
        }
        .slick-dots li button:before {
          font-size: 12px;
          color: #ef4444;
        }
        .slick-dots li.slick-active button:before {
          color: #b91c1c;
        }
      `}</style>
    </div>
  );
};

export default BreakingNewsSlider;