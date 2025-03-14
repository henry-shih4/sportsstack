import React from 'react';
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import baseball from "/images/baseball.svg";
import basketball from "/images/basketball.svg";
import football from "/images/football.svg";

export default function ArticleCard({ article }) {
  const getSportIcon = (category) => {
    switch(category) {
      case "NBA":
        return basketball;
      case "NFL":
        return football;
      case "MLB":
        return baseball;
      default:
        return baseball;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/3 relative overflow-hidden">
          <Link to={`/articles/${article._id}`}>
            <LazyLoadImage
              src={article.hero_img}
              className="w-full h-[200px] md:h-full object-cover transform hover:scale-105 transition-transform duration-300"
              alt={article.title}
              effect="opacity"
            />
          </Link>
        </div>

        {/* Content Section */}
        <div className="p-6 md:w-2/3">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center bg-blue-50 rounded-full px-3 py-1">
              <img 
                src={getSportIcon(article.category)} 
                alt={article.category} 
                className="w-5 h-5 mr-2" 
              />
              <span className="text-blue-800 font-medium text-sm">
                {article.category}
              </span>
            </div>
            <span className="text-gray-500 text-sm">{article.date_string}</span>
          </div>

          <Link 
            to={`/articles/${article._id}`}
            className="block group"
            onClick={() => window.scrollTo(0, 0)}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h3>
          </Link>

          <p className="text-gray-600 line-clamp-3 mb-4">
            {article.description}
          </p>

          <Link 
            to={`/articles/${article._id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            Read more
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 