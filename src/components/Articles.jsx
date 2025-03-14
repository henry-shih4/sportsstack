import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import baseball from "/images/baseball.svg";
import basketball from "/images/basketball.svg";
import football from "/images/football.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from 'axios';
import SearchBar from "./SearchBar";
import ArticleCard from "./ArticleCard";
const apiUrl = import.meta.env.VITE_API_URL; // Access the environment variable

const categories = ["all", "NBA", "NFL", "MLB"];

export default function Articles() {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [responseInfo, setResponseInfo] = useState({
    currentPage: 0,
    totalPages: 0,
    totalArticles: 0,
  });

  const { category = 'all', page = '1' } = useParams(); // Default values
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const currentPage = parseInt(page);

  // Add prevCategory ref to track category changes
  const prevCategoryRef = useRef(category);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };
      

useEffect(() => {
  // Validate category
  if (category && !categories.includes(category)) {
    navigate("/not-found");
    return;
  }

  // Check if category has changed
  if (prevCategoryRef.current !== category) {
    prevCategoryRef.current = category;
    if (currentPage !== 1) {
      navigate(`/${category}/1`);
    }
  }
}, [category, currentPage, navigate]);


  useEffect(() => {

    // Fetch articles
    const fetchArticles = async () => {
      try {
        const url = `${apiUrl}/articles/${
          category && category !== 'all' ? `?category=${category}` : ''
        }${category && category !== 'all' ? '&' : '?'}page=${currentPage}`;

        const response = await axios.get(url);
        setFilteredArticles(response.data.data.articles);
        setResponseInfo({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalArticles: response.data.totalArticles,
          results:response.data.results
        });
      } catch (error) {
        navigate("/not-found");
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [category, currentPage, navigate]);

  // Update pagination buttons to use navigation instead of state
  const handlePageChange = (newPage) => {
    navigate(`/${category}/${newPage}`);
    window.location.reload();
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SearchBar />

      <h1 className="text-3xl font-extrabold mb-8">
        {`${category.charAt(0).toUpperCase() + category.slice(1)} Articles`}
      </h1>

      <div className="space-y-8">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))
        ) : (
          <div className="text-center py-12">No articles found.</div>
        )}
      </div>

      {responseInfo && filteredArticles.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="text-center text-gray-600">
            Page: {responseInfo.currentPage} of {responseInfo.totalPages}
          </div>
          
          <div className="flex justify-center gap-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === responseInfo.totalPages}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>

          <div className="text-center text-gray-600">
            Showing {responseInfo.results} results of {responseInfo.totalArticles} articles
          </div>
        </div>
      )}
    </div>
  );
}
