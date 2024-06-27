import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ArticleContext } from "../context/ArticleContext";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Comments from "../components/Comments";
import ReactMarkDown from "react-markdown";

export default function Article() {
  const [article, setArticle] = useState([]);
  const { articleId } = useParams();
  const { articles } = useContext(ArticleContext);
  const [commentText, setCommentText] = useState("");
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [errMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleFormSubmission = async (e) => {
    {
      e.preventDefault();
      try {
        const token = await getAccessTokenSilently();
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.post(
          `http://localhost:3000/api/v1/articles/${articleId}/comments`,
          {
            content: commentText,
            authID: user.sub,
            email: user.email,
            name: user.name,
            picture: user.picture,
            username: user.nickname,
          },
          config
        );
        setCommentText("");
      } catch (error) {
        console.log(error.message);
        setErrorMsg(error.message);
      }
    }
  };

  useEffect(() => {
    try {
      if (articleId) {
        const article = articles.find((article) => article._id === articleId);
        setArticle(article);
        // if (!article) {
        //   navigate("/not-found");
        // }
      }
    } catch {
      navigate("/not-found");
    }
  }, [articles, articleId]);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <>
      {article ? (
        <div>
          <section className="flex justify-center items-center ">
            <div className=" block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="w-[100%] flex flex-wrap justify-center items-center md:px-8 py-8">
                <div className="w-5/12 min-w-[300px] shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-5/12">
                  <img
                    src={article.hero_img}
                    alt="Trendy Pants and Shoes"
                    className="w-full object-fill rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
                  />
                </div>
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-10/12">
                  <div className="px-6 py-12 md:px-12">
                    <h2 className="mb-4 text-2xl font-bold">{article.title}</h2>
                    <p className="mb-6 flex items-center font-bold uppercase text-danger dark:text-danger-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="mr-2 h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                        />
                      </svg>
                      {article.category}
                    </p>
                    <div className="p-4 ">{article.date}</div>

                    <div className=" mb-6  text-neutral-500 dark:text-neutral-300 max-h-[460px] overflow-x-hidden overflow-y-visible whitespace-pre-wrap tracking-wider px-4">
                      <ReactMarkDown children={article.content} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}
      <div>
        <form
          className="flex flex-col justify-center items-center gap-y-4 pt-8"
          onSubmit={handleFormSubmission}
        >
          <label
            htmlFor="comment-text"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Comment
          </label>
          {errMsg ? <p className="text-red-500">{errMsg}</p> : null}
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            id="comment-text"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
          <button
            className="w-[100px] py-2.5  text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <Comments articleId={articleId} />
    </>
  );
}
