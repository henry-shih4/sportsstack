import React, { useState, useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export default function UserComment(props) {
  const [userComment, setUserComment] = useState([]);

  const getUserComment = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/users/${props.userId}`
      );

      if (response) {
        setUserComment(response.data.data);
        // setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user comment:', error);
    }
  };

  useEffect(() => {
    getUserComment();
  }, [props.userId]);


  return (
    <>
    
      {userComment ? (
        <>
          <section className="flex items-center gap-4 animate-fade-in">
            <img
              className="rounded-full object-cover w-12 h-12 ring-2 ring-gray-100"
              src={userComment.picture}
              width={48}
              height={48}
              alt={userComment.username}
            />
            <div className="flex flex-col">
              <div className="font-medium text-gray-900">{userComment.username}</div>
              <div className="text-sm text-gray-500">{userComment.name}</div>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
}
