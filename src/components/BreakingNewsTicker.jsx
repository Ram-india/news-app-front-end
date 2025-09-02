import React from 'react'

const BreakingNewsTIcker = () => {
  return (
    <div className="bg-red-600 text-white py-2 px-4 text-sm font-medium flex items-center">
      <span className="mr-2 font-bold">Breaking News</span>
      <marquee>{headline}</marquee>
    </div>
  )
}

export default BreakingNewsTIcker