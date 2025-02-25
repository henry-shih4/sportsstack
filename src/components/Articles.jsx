import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import baseball from "/images/baseball.svg";
import basketball from "/images/basketball.svg";
import football from "/images/football.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from 'axios';
import SearchBar from "./SearchBar";

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
        const url = `http://localhost:3000/api/v1/articles${
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
  };


  return (
    
    <div>

      <SearchBar />

   <div className="flex justify-center space-x-6 py-4 m-4">
      <NavLink
        to="/all/1"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-bold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        All
      </NavLink>
      <NavLink
        to="/NBA/1"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-bold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        NBA
      </NavLink>
      <NavLink
        to="/NFL/1"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-bold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        NFL
      </NavLink>
      <NavLink
        to="/MLB/1"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-bold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        MLB
      </NavLink>
    </div>

        <h1 className=" text-3xl font-extrabold p-4 m-4 mb-6">{`${category.charAt(0).toUpperCase()+category.slice(1,category.length)} Articles`}</h1>
        {filteredArticles.length > 0
            ? filteredArticles.map((article) => (
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
                    <h5 className="mb-3 text-md md:text-lg font-bold">
                      <Link
                        to={`/articles/${article._id}`}
                        className="hover:underline"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        {article.title}
                      </Link>
                    </h5>
                    <div className="mb-3 flex items-center justify-center text-sm font-medium text-blue-600 gap-x-2">
                      {article.category === "NBA" ? (
                        <img src={basketball}></img>
                      ) : article.category === "NFL" ? (
                        <img src={football}></img>
                      ) : (
                        <img src={baseball}></img>
                      )}

                      <h1>{article.category}</h1>
                    </div>
                    <p className="mb-6 text-neutral-500 dark:text-neutral-800">
                      <small>{article.date_string}</small>
                    </p>
                    <p className="text-neutral-500 dark:text-neutral-800">
                      {article.description}
                    </p>
                  </div>
                  <div className="m-auto w-[80%] h-[2px] bg-neutral-500 mt-4"></div>
                </div>
              ))
            : null}


    {responseInfo && filteredArticles.length > 0 ? (
        <>
        <div>Page: {responseInfo.currentPage} of {responseInfo.totalPages}</div>
        <div className="flex justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === responseInfo.totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div>Showing {responseInfo.results} results of {responseInfo.totalArticles} articles</div>
      </>
    ) : (
      <div>No articles found.</div>
    )}
  </div>
  );
}
