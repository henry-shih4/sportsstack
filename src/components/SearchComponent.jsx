import React, { useState, useEffect } from "react";
import baseball from "/images/baseball.svg";
import basketball from "/images/basketball.svg";
import football from "/images/football.svg";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SearchBar from "./SearchBar";
import ArticleCard from "./ArticleCard";
const apiUrl = import.meta.env.VITE_API_URL; // Access the environment variable



export default function SearchComponent() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseInfo, setResponseInfo] = useState({
    currentPage: 0,
    totalPages: 0,
    totalArticles: 0,
  });
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const navigate = useNavigate();

    // // Fetch articles
    // const fetchArticles = async () => {
    //   try {
    //     const url = `${apiUrl}/articles/${
    //       category && category !== 'all' ? `?category=${category}` : ''
    //     }${category && category !== 'all' ? '&' : '?'}page=${currentPage}`;

    //     const response = await axios.get(url);
    //     setFilteredArticles(response.data.data.articles);
    //     setResponseInfo({
    //       currentPage: response.data.currentPage,
    //       totalPages: response.data.totalPages,
    //       totalArticles: response.data.totalArticles,
    //       results:response.data.results
    //     });
    //   } catch (error) {
    //     navigate("/not-found");
    //     console.error('Error fetching articles:', error);
    //   }
    // };


  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);
      setSearchResults([]); // Clear previous results

      if (query.length < 2) {
        setError({ response: { data: { message: 'Search query must be at least 2 characters long' } } });
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${apiUrl}/articles?search=${query}&page=${currentPage}`
        );
        setSearchResults(response.data.data.articles);
              setResponseInfo({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalArticles: response.data.totalArticles,
          results:response.data.results
        });
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError(error); // Store the entire error object
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

    // Update pagination buttons to use navigation instead of state
    const handlePageChange = (newPage) => {
      navigate(`/search?q=${query}&page=${newPage}`);
      window.location.reload();
    };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">Search Results for: {query}</h2>
      <SearchBar initialQuery={query} />

      {/* Updated Error and Results Section */}
      {error ? (
        <div className="text-center py-12">
          {(error.response?.status === 404 || query.length < 2) ? (
            <div className="text-gray-500">
              {error.response.data.message || 'No results found.'}
            </div>
          ) : (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
              An error occurred while searching. Please try again.
            </div>
          )}
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-8">
        {searchResults.length > 0 ? (
          searchResults.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))
        ) : (
          <div className="text-center py-12">No articles found.</div>
        )}
      </div>
      )}

{responseInfo && searchResults.length > 0 && (
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
