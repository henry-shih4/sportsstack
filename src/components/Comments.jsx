import React, { useState, useEffect } from "react";
import axios from "axios";
import UserComment from "./UserComment";

export default function Comments(props) {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/articles/${props.articleId}/comments`
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
  }, [comments]);

  return (
    <>
      <main className="flex flex-col gap-y-4 pt-8">
        <h1 className="text-xl font-bold">Comments</h1>
        {comments.length <= 0 ? (
          <p>No comments yet</p>
        ) : (
          comments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((comment) => (
              <div className="flex gap-x-8  items-center">
                <UserComment userId={comment.user} />
                <p className="text-sm">{comment.content}</p>
              </div>
            ))
        )}
      </main>
    </>
  );
}
