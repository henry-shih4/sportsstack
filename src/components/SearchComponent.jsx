import React, { useState, useContext, useEffect } from "react";
import { ArticleContext } from "../context/ArticleContext";
import Pagination from "./Pagination";
import { Link, useLocation, useNavigate } from "react-router-dom";

import baseball from "/images/baseball.svg";
import basketball from "/images/basketball.svg";
import football from "/images/football.svg";

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

export default function SearchComponent() {
  const { articles, loading, error } = useContext(ArticleContext);
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const navigate = useNavigate();

  //   const [pageArticles, setPageArticles] = useState([]);

  useEffect(() => {
    if (query) {
      console.log("query change");
      console.log(query);
      console.log(articles);
      let items = articles
        .filter((article) =>
          article.title.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      console.log(items);
      setFilteredArticles(items);
    } else {
      console.log("wtf");
      setFilteredArticles([]);
    }
  }, [articles, query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  //   useEffect(() => {
  //     setPageArticles(filteredArticles);
  //   }, [filteredArticles]);

  useEffect(() => {
    // console.log(query);
    console.log(filteredArticles);
  });

  return (
    <div>
      <form onSubmit={handleSearchSubmit} className="mb-10">
        <div class="max-w-md mx-auto">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              placeholder="Search for articles..."
            />
            <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>
      </form>
      <div className="flex flex-col gap-y-6 justify-center items-center">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article._id} className="mb-6 flex flex-wrap">
              <div className="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-3/12">
                <div
                  className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <img
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
                  <small>{article.date}</small>
                </p>
                <p className="text-neutral-500 dark:text-neutral-300">
                  {article.description}
                </p>
              </div>
              <div className="m-auto w-[80%] h-[2px] bg-neutral-500 mt-4"></div>
            </div>
          ))
        ) : (
          <div className="h-[400px] w-[400px] bg-slate-100 flex flex-col gap-y-4 justify-center items-center">
            <p>No current results. </p>
            <p>Enter search to see articles.</p>
          </div>
        )}
        {/* {pageArticles ? (
          <Pagination
            items={filteredArticles}
            pageLimit={10}
            setPageItems={setPageArticles}
          />
        ) : null} */}
      </div>
    </div>
  );
}
