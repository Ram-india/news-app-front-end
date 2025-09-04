import React, { useRef, useEffect, useState } from "react";

const TickerBreakingNews = ({ articles }) => {
  const tickerRef = useRef(null);
  const [duration, setDuration] = useState(20);

  useEffect(() => {
    const calculateDuration = () => {
      if (tickerRef.current) {
        const width = tickerRef.current.scrollWidth;

        // Responsive speed
        let speed = 100;
        if (window.innerWidth < 640) speed = 50; // mobile
        else if (window.innerWidth < 1024) speed = 80; // tablet

        setDuration(width / speed);
      }
    };

    calculateDuration();
    window.addEventListener("resize", calculateDuration);
    return () => window.removeEventListener("resize", calculateDuration);
  }, [articles]);

  const tickerItems = articles.map((article, index) => (
    <React.Fragment key={index}>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline whitespace-nowrap"
      >
        {article.title}
      </a>
      {index < articles.length - 1 && <span className="mx-4 text-white"> • </span>}
    </React.Fragment>
  ));

  return (
    <div
      className="bg-red-500 text-white py-1 px-4 text-sm font-medium flex items-center"
      aria-label="Breaking News"
    >
      {/* Fixed label */}
      <div className="font-bold flex-shrink-0 bg-red-500 z-10 relative">
        Breaking News:
      </div>

      {/* Ticker wrapper */}
      <div className="relative overflow-hidden flex-1 ml-4">
        <div
          className="flex whitespace-nowrap animate-marquee"
          ref={tickerRef}
          style={{ animationDuration: `${duration}s` }}
        >
          {tickerItems}
          {tickerItems}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: inline-flex;
          animation: marquee linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default TickerBreakingNews;