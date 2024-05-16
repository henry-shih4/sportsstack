import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { ArticleContext } from "../context/ArticleContext";
import Pagination from "./Pagination";
import baseball from "/images/baseball.svg";
import basketball from "/images/basketball.svg";
import football from "/images/football.svg";

export default function Articles() {
  const { articles, loading, error } = useContext(ArticleContext);
  const { category } = useParams();

  const [filteredArticles, setFilteredArticles] = useState(
    articles.sort((a, b) => new Date(b.date) - new Date(a.date))
  );
  const [pageArticles, setPageArticles] = useState(articles);

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
      <div className="flex justify-center gap-x-4 font-bold text-xl">
        <Link to={`/all/1`}> All</Link>
        <Link to={`/NBA/1`}> NBA</Link>
        <Link to={`/NFL/1`}> NFL</Link>
        <Link to={`/MLB/1`}> MLB</Link>
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

          {filteredArticles.length > 0
            ? pageArticles.map((article) => (
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
            : null}
          {pageArticles ? (
            <Pagination
              items={filteredArticles}
              pageLimit={10}
              setPageItems={setPageArticles}
            />
          ) : null}
        </section>
      )}
    </div>
  );
}
