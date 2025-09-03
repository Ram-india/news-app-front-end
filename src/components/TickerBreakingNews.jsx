import React, { useRef, useEffect, useState } from "react";

const TickerBreakingNews = ({ articles }) => {
  const tickerRef = useRef(null);
  const [duration, setDuration] = useState(20); // default 20s

  // Calculate animation duration based on text width
  useEffect(() => {
    if (tickerRef.current) {
      const width = tickerRef.current.scrollWidth;
      const speed = 100; // pixels per second
      setDuration(width / speed);
    }
  }, [articles]);

  // Add separator between articles
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
      {index < articles.length - 1 && (
        <span className="mx-4 text-white">•</span> // separator dot
      )}
    </React.Fragment>
  ));

  return (
    <div className="bg-red-600 text-white py-2 px-4 text-sm font-medium overflow-hidden relative">
      <span className="font-bold mr-4">Breaking News:</span>

      <div
        ref={tickerRef}
        className="absolute flex animate-marquee hover:pause-marquee"
        style={{ animationDuration: `${duration}s` }}
      >
        {tickerItems}
        {tickerItems} {/* duplicate for seamless scroll */}
      </div>

      <style jsx>{`
        .animate-marquee {
          display: inline-flex;
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .pause-marquee {
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