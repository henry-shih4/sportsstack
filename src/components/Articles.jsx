import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ArticleContext } from "../context/ArticleContext";
import Pagination from "./Pagination";
import baseball from "/images/baseball.svg";
import basketball from "/images/basketball.svg";
import football from "/images/football.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const categories = ["all", "NBA", "NFL", "MLB"];

export default function Articles() {
  const { articles, loading, error } = useContext(ArticleContext);
  const { category } = useParams();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const [filteredArticles, setFilteredArticles] = useState(
    articles.sort((a, b) => new Date(b.date) - new Date(a.date))
  );
  const [pageArticles, setPageArticles] = useState(articles);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  useEffect(() => {
    if (category) {
      if (categories.includes(category) === false) {
        console.log("not a valid category");
        navigate("/not-found");
      }
    }
  }, [category]);

  useEffect(() => {
    if (articles && category !== "all") {
      let items = articles.filter(
        (article) => article.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredArticles(items);
    } else {
      setFilteredArticles(articles);
    }
  }, [articles, category]);

  return (
    <div className="flex flex-col  gap-y-4">
      <div className="flex justify-center gap-x-4 font-bold text-xl py-4">
        <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full focus-within:z-10">
            <NavLink
              to="/all/1"
              className={({ isActive }) =>
                isActive
                  ? "inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-2  active focus:outline-none dark:bg-gray-700 dark:text-white"
                  : "inline-block w-full p-4 border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-2 focus:outline-none  dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              }
              aria-current="page"
            >
              All
            </NavLink>
          </li>
          <li className="w-full focus-within:z-10">
            <NavLink
              to="/NBA/1"
              className={({ isActive }) =>
                isActive
                  ? "inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  : "inline-block w-full p-4  border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-2 focus:outline-none  dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              }
            >
              NBA
            </NavLink>
          </li>
          <li className="w-full focus-within:z-10">
            <NavLink
              to="/NFL/1"
              className={({ isActive }) =>
                isActive
                  ? "inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  : "inline-block w-full p-4 bg-white border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-2 focus:outline-none  dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              }
            >
              NFL
            </NavLink>
          </li>
          <li className="w-full focus-within:z-10">
            <NavLink
              to="/MLB/1"
              className={({ isActive }) =>
                isActive
                  ? "inline-block w-full p-4 bg-white border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  : "inline-block w-full p-4 bg-white border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-2 focus:outline-none  dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              }
            >
              MLB
            </NavLink>
          </li>
        </ul>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <section className="mb-32 text-center md:text-left">
          <h2 className="mb-12 text-center text-3xl font-bold">
            {category && category !== "all"
              ? `${category} Articles`
              : "All Articles"}
          </h2>

          <form onSubmit={handleSearchSubmit} className="mb-10">
            <div className="max-w-md mx-auto">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  placeholder="Search for articles..."
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {filteredArticles.length > 0
            ? pageArticles.map((article) => (
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
                      <small>{article.date}</small>
                    </p>
                    <p className="text-neutral-500 dark:text-neutral-300">
                      {article.description}
                    </p>
                  </div>
                  <div className="m-auto w-[80%] h-[2px] bg-neutral-500 mt-4"></div>
                </div>
              ))
            : null}
          <div className="flex justify-center items-center">
            {pageArticles ? (
              <Pagination
                items={filteredArticles}
                pageLimit={10}
                setPageItems={setPageArticles}
              />
            ) : null}
          </div>
        </section>
      )}
    </div>
  );
}
