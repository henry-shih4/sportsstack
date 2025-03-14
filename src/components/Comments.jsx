import React, { useState, useEffect } from "react";
import axios from "axios";
import UserComment from "./UserComment";
import { useAuth0 } from "@auth0/auth0-react";
import deleteButton from "/images/deleteButton.svg";
const apiUrl = import.meta.env.VITE_API_URL; // Access the environment variable

export default function Comments(props) {
  const [comments, setComments] = useState([]);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState({});
  const [deleteComment, setDeleteComment] = useState(false);

  const getComments = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/articles/${props.articleId}/comments`
      );

      if (response) {
        setComments(response.data.data);
        // setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, [props.newComment, deleteComment]);

  const handleCommentDelete = async (commentId, authID) => {
    try {
      const token = await getAccessTokenSilently();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${apiUrl}/comments/${commentId}`,
        {
          authID: authID,
          commentId: commentId,
        },
        config
      );

      if (response) {
       setDeleteComment(true)
       setTimeout(() => {
         setDeleteComment(false)
       }, 1000)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl transform transition-all">
            <div className="text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12"
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
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-xl font-semibold text-gray-800">
                Are you sure you want to delete this comment?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    handleCommentDelete(commentToDelete.commentId, commentToDelete.authID);
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8 text-gray-800 mt-6">Comments</h1>
        
        {comments.length <= 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-6">
            {comments
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((comment) => (
                <div
                  key={comment._id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <UserComment userId={comment.user} />
                    <div className="flex-grow">
                      <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    {user && isAuthenticated && comment.authID === user.sub && (
                      <button
                        onClick={() => {
                          setCommentToDelete({
                            commentId: comment._id,
                            authID: comment.authID,
                          });
                          setShowModal(true);
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <img src={deleteButton} alt="delete" className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
