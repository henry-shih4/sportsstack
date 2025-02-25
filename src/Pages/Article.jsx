import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Comments from "../components/Comments";
import ReactMarkDown from "react-markdown";
import baseball from "/images/baseball.svg";
import basketball from "/images/basketball.svg";
import football from "/images/football.svg";

export default function Article() {
  const [article, setArticle] = useState([]);
  const { articleId } = useParams();

  const [commentText, setCommentText] = useState("");
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [errMsg, setErrorMsg] = useState("");
  const [newComment, setNewComment] = useState(false);
  const navigate = useNavigate();



  const handleFormSubmission = async (e) => {
    {
      e.preventDefault();
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          await axios.post(
            `https://sports-stack-backend-gzabcuapa2a8gafm.canadacentral-01.azurewebsites.net/api/v1/articles/${articleId}/comments`,
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
          setNewComment(true);
          setTimeout(() => {
            setNewComment(false);
          }, 1000);
        } else {
          setErrorMsg("Please login to comment");
        }
      } catch (error) {
        setErrorMsg(error.message);
      }
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (articleId) {
          const response = await axios.get(`http://localhost:3000/api/v1/articles/${articleId}`);
          console.log(response);
          setArticle(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        navigate("/not-found");
      }
    };

    fetchArticle();
  }, [articleId, navigate]);

  return (
    <>
      {article ? (
        <div>
          <section className="flex justify-center items-center ">
            <div className=" block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="w-[100%] flex flex-wrap justify-center items-center py-4 md:px-8 ">
                <div className="w-5/12 min-w-[300px] shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-5/12">
                  <img
                    src={article.hero_img}
                    alt="Trendy Pants and Shoes"
                    className="pb-4 w-full object-fill rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
                  />
                </div>
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-10/12">
                  <div className="px-6  md:px-12 ">
                    <h2 className="mb-4 text-2xl font-bold dark:text-gray-200">{article.title}</h2>
                    <div className="flex gap-x-2 py-2 justify-start items-center font-bold uppercase dark:text-gray-200">
                      {article.category === "NBA" ? (
                        <img src={basketball}></img>
                      ) : article.category === "NFL" ? (
                        <img src={football}></img>
                      ) : (
                        <img src={baseball}></img>
                      )}
                      {article.category}
                    </div>
                    <div className="pb-4 flex justify-start underline dark:text-gray-200">
                      {article.date_string}
                    </div>

                    <div className=" mb-6  text-neutral-500 dark:text-neutral-300 max-h-[460px] overflow-x-hidden overflow-y-visible whitespace-pre-wrap tracking-wider px-4 text-sm md:text-base">
                      <ReactMarkDown children={article.content} />
                      <Link to={article.url} className="py-4 text-blue-500 ">
                        Source
                      </Link>
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
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Comment
          </label>
          {errMsg ? (
            <p className="text-red-500">{"Something went wrong. Try again."}</p>
          ) : null}
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
      <Comments articleId={articleId} newComment={newComment} />
    </>
  );
}
