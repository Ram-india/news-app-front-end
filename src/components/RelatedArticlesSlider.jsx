import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Newscard from "./Newscard";

const RelatedArticlesSlider = ({ articles }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,      // show 3 cards per slide
    slidesToScroll: 3,    // scroll 3 cards at a time
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

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