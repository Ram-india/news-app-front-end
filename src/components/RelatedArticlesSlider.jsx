import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Newscard from "./Newscard";

const RelatedArticlesSlider = ({ articles }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,      // show 3 cards per slide
    slidesToScroll: 3,    // scroll 3 cards at a time
    NextArrow: <NextArrow />,
    PrevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const NextArrow = ({onclick}) => (
   <div 
   className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-200"
  onClick={onclick}
  >
    <FiArrowRight size={24} color="#1f2937" />
    </div>
   );

    const PrevArrow = ({onclick}) => (
    <div
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-200"
    onClick={onclick}
    >
    <FiArrowLeft size={24} color="#1f2937" />
    </div>
    );
  return (
    <Slider {...settings} className="space-x-4">
      {articles.map((article) => (
        <div key={article._id} className="p-2">
          <Newscard article={article} />
        </div>
      ))}
    </Slider>
  );
};

export default RelatedArticlesSlider;