import React, { useState, useEffect } from "react";
import axios from "axios";
import UserComment from "./UserComment";
import { useAuth0 } from "@auth0/auth0-react";
import deleteButton from "/images/deleteButton.svg";

export default function Comments(props) {
  const [comments, setComments] = useState([]);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState({});
  const [deleteComment, setDeleteComment] = useState(false);

  const getComments = async () => {
    try {
      const response = await axios.get(
        `https://sports-stack.adaptable.app/api/v1/articles/${props.articleId}/comments`
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
        `https://sports-stack.adaptable.app/api/v1/comments/${commentId}`,
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
        <div className="flex flex-col justify-center items-center fixed top-[50%] left-[25%]   z-0 h-[400px] w-[400px] bg-gray-200">
          <div className="">
            <svg
              class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
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
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <button
              onClick={() => {
                handleCommentDelete(
                  commentToDelete.commentId,
                  commentToDelete.authID
                );
                setShowModal(false);
              }}
              type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={() => setShowModal(false)}
              type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              No, cancel
            </button>
          </div>
        </div>
      ) : null}
      <main className="flex flex-col gap-y-4 pt-8 ">
        <h1 className="text-xl font-bold">Comments</h1>
        {comments.length <= 0 ? (
          <p>No comments yet</p>
        ) : (
          comments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((comment) => (
              <div
                key={comment._id}
                className="flex justify-center items-center w-full md:justify-between  py-2 mb-4"
              >
                <div className="flex flex-col gap-x-5 justify-center items-center  md:flex-row">
                  <UserComment userId={comment.user} />
                  <p className="text-sm p-2">{comment.content}</p>
                  
                </div>

                {user && isAuthenticated ? (
                  <div className="float-end">
                    {comment.authID == user.sub ? (
                      <button
                        onClick={() => {
                          setCommentToDelete({
                            commentId: comment._id,
                            authID: comment.authID,
                          });
                          setShowModal(true);
                        }}
                      >
                        <img src={deleteButton} alt="delete-icon" />
                      </button>
                    ) : null}
                   
                  </div>
                ) : null}
              </div>
            ))
        )}
      </main>
    </>
  );
}
