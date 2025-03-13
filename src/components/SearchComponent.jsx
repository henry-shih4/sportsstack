import React, { useState, useEffect } from "react";
import baseball from "/images/baseball.svg";
import basketball from "/images/basketball.svg";
import football from "/images/football.svg";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SearchBar from "./SearchBar";
const apiUrl = import.meta.env.VITE_API_URL; // Access the environment variable



export default function SearchComponent() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/articles?search=${query}`
        );
        setSearchResults(response.data.data.articles);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Results for: {query}</h2>
      <SearchBar initialQuery={query} />
{searchResults.length > 0
  ? searchResults.map((article) => (
      <div key={article._id} className="mb-6 flex flex-wrap">
        <div className="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-3/12">
          <div
            className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <LazyLoadImage
              src={article.hero_img}
              className="w-[full] object-contain"
            />
            <a href="#!">
              <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]"></div>
            </a>
          </div>
        </div>

        <div className="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-9/12 xl:w-7/12">
          <h5 className="mb-3 text-lg font-bold">
            <Link
              to={`/articles/${article._id}`}
              className="hover:underline"
              onClick={() => window.scrollTo(0, 0)}
            >
              {article.title}
            </Link>
          </h5>
          <div className="mb-3 flex items-center justify-center text-sm font-medium text-blue-600 gap-x-2 md:justify-start">
            {article.category === "NBA" ? (
              <img src={basketball}></img>
            ) : article.category === "NFL" ? (
              <img src={football}></img>
            ) : (
              <img src={baseball}></img>
            )}

            <h1>{article.category}</h1>
          </div>
          <p className="mb-6 text-neutral-500 dark:text-neutral-300">
            <small>{article.date_string}</small>
          </p>
          <p className="text-neutral-500 dark:text-neutral-300">
            {article.description}
          </p>
        </div>
        <div className="m-auto w-[80%] h-[2px] bg-neutral-500 mt-4"></div>
      </div>
    ))
  : <div>No results found.</div>}
    </div>
  );
}
