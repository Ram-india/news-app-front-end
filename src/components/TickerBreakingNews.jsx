import React, { useRef, useEffect, useState } from "react";

const TickerBreakingNews = ({ articles }) => {
  const tickerRef = useRef(null);
  const [duration, setDuration] = useState(20); // default duration in seconds

  // Calculate animation duration dynamically based on total width
  useEffect(() => {
    if (tickerRef.current) {
      const width = tickerRef.current.scrollWidth;
      const speed = 100; // pixels per second
      setDuration(width / speed);
    }
  }, [articles]);

  // Prepare ticker items with separators
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
      {index < articles.length - 1 && <span className="mx-4 text-white">•</span>}
    </React.Fragment>
  ));

  return (
    <div className="bg-red-600 text-white py-2 px-4 text-sm font-medium overflow-hidden flex items-center">
      {/* Fixed title on left */}
      <div className="font-bold mr-4  bg-red-600 flex-shrink-0">Breaking News:</div>

      {/* Scrolling ticker */}
      <div
        className="flex whitespace-nowrap animate-marquee hover:pause-marquee"
        ref={tickerRef}
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