import React from 'react'
import { useLocation } from 'react-router-dom'

const NewsDetail = () => {
    const location = useLocation();
    const {article} = location.state || {}; 
    if(!article)   {
        return <div>No article data available.</div>;
    }
  return (
    <div className='container mx-auto px-4 py-6'>
        <h1 className='text-2xl font-bold mb-4 '>{article.title}</h1>
        {article.urlToImage && (
            <img
            src={article.urlToImage} 
            alt={article.title}
            className='w-full h-96 object-cover mb-4 rounded-xl'
            />
        )}
        <p className="text-lg leading-relaxed mb-4">{article.content || article.description}</p>
      <p className="text-gray-600 text-sm">
        <strong>Author:</strong> {article.author || "Unknown"} |{" "}
        <strong>Published:</strong> {new Date(article.publishedAt).toLocaleString()}
      </p>
    </div>
  )
}

export default NewsDetail