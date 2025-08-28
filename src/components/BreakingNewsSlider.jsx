import React from "react";
import Slider from "react-slick"; // slick-carousel

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BreakingNewsSlider = ({ articles }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-bold mb-4 text-red-600">
         Breaking News
      </h2>
      <Slider {...settings}>
        {articles.map((article, index) => (
          <div key={index} className="p-2">
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-t-xl"
                />
              )}
              <div className="p-3">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {article.source?.name || "Unknown Source"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BreakingNewsSlider;