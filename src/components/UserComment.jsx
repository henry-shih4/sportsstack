import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserComment(props) {
  const [userComment, setUserComment] = useState([]);

  const getUserComment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${props.userId}`
      );

      if (response) {
        setUserComment(response.data.data);
        // setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserComment();
  }, [props.userId]);

  return (
    <>
      {userComment ? (
        <>
          <section className="flex items-center gap-x-6 min-w-[180px]">
            <img
              className="rounded-full"
              src={userComment.picture}
              width={56}
              height={56}
            />
            <div className="flex flex-col gap-y-2">
              <div className="text-md">{userComment.username}</div>
              <div className="text-xs">{userComment.name}</div>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
}
