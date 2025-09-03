import React from 'react'

const TickerBreakingNews = ({articles}) => {
  return (
    <div className='bg-red-600 text-white py-2 px-4 text-sm font-medium flex items-center'>
        <span className="mr-2 font-bold  w-full"> Breaking news</span>
        {
            articles.map((article, index) => (
                <marquee >{article.title}</marquee>
            ))
        }
        working
    </div>
  )
}

export default TickerBreakingNews