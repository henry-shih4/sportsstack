import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Comments from "../components/Comments";
import ReactMarkDown from "react-markdown";
import baseball from "/images/baseball.svg";
import basketball from "/images/basketball.svg";
import football from "/images/football.svg";
const apiUrl = import.meta.env.VITE_API_URL; // Access the environment variable

export default function Article() {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
            `${apiUrl}/articles/${articleId}/comments`,
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
      setIsLoading(true);
      try {
        if (articleId) {
          const response = await axios.get(`${apiUrl}/articles/${articleId}`);
          setArticle(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        navigate("/not-found");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId, navigate]);

  return (
    <div className="mb-4">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : article ? (
        <>
          <section className="flex justify-center items-center mb-8 min-h-[60vh]">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden p-6">
              <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="lg:w-1/2 flex justify-center items-center flex-col ">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                    {article.title}
                  </h1>
                  <img
                    src={article.hero_img}
                    alt={article.title}
                    className="rounded-lg object-scale-downtransform transition-transform duration-300"
                  />
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2 p-6 lg:p-8">
                  <div className="flex justify-center items-center gap-2 mb-4">
                    <div className="flex items-center bg-blue-100 rounded-full px-4 py-1">
                      {article.category === "NBA" ? (
                        <img src={basketball} className="w-5 h-5 mr-2" alt="basketball" />
                      ) : article.category === "NFL" ? (
                        <img src={football} className="w-5 h-5 mr-2" alt="football" />
                      ) : (
                        <img src={baseball} className="w-5 h-5 mr-2" alt="baseball" />
                      )}
                      <span className="text-blue-800 font-semibold">{article.category}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{article.date_string}</span>
                  </div>


                  <div className="prose max-w-none scrollbar-custom overflow-y-auto max-h-[400px] pr-4">
                    <ReactMarkDown children={article.content} />
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800"
                    >
                      Read more at source
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comment Form Section */}
          <div className="max-w-4xl mx-auto">
            <form
              className="bg-white rounded-lg shadow-lg p-6 mb-8"
              onSubmit={handleFormSubmission}
            >
              <label
                htmlFor="comment-text"
                className="block mb-4 text-lg font-medium text-gray-900"
              >
                Add a Comment
              </label>
              {errMsg && (
                <p className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg">{errMsg}</p>
              )}
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                id="comment-text"
                rows="4"
                className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Share your thoughts..."
              />
              <button
                className="mt-4 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors"
                type="submit"
              >
                Submit Comment
              </button>
            </form>
          </div>

          {/* Comments Section */}
          <div className="max-w-4xl mx-auto">
            <Comments articleId={articleId} newComment={newComment} />
          </div>
        </>
      ) : null}
    </div>
  );
}
