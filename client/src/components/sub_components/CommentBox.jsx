import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "flowbite-react";
import {FaThumbsUp} from "react-icons/fa";
import {useSelector} from "react-redux"

export default function CommentBox({ com,likeFunction  }) {
  const [user, setUser] = useState({});
  const {currentUser} = useSelector(state=> state.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/getUserbyId", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: com.userId }),
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        } else {
          setUser("User  not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [com]);
  console.log(user);

  return (
    <div className="p-5 m-5 border-2 dark:border-gray-500 border-dotted dark:hover:border-gray-200 rounded-lg border-gray-400 hover:border-gray-600">
      <div className="mb-5 border-b dark:border-cyan-300 dark:hover:border-green-400 border-gray-200 hover:border-gray-400 ">
        <div className="flex items-center  gap-3  p-4">
          <img
            className="w-8 h-8 resize-none object-cover rounded-full "
            src={user.photo}
            alt="Profile"
          ></img>
          <p className="font-bold">{user ? user.username : "Anonymus"}</p>
          <p className="text-xs ">{moment(com.createdAt).fromNow()}</p>
        </div>
        <p className="mb-2">{com.content}</p>
      </div>
      <div className="flex items-center gap-4">
        <button type="button" className="text-gray-400 hover:text-blue-300" onClick={()=> {
          likeFunction(com._id)
          
        }} >
          <FaThumbsUp className={`hover:scale-125 duration-300 transition-all ${com.likes.includes(currentUser._id) && "text-blue-700"


          }`}></FaThumbsUp>
        </button>
        <p> 
          {com.countofLikes} {com.countofLikes === 1 ? "Like" : "Likes"}
        </p>
       
      </div>
    </div>
  );
}
