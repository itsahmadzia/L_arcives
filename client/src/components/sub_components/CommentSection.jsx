import { Button, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentBox from "./CommentBox";
//import likesound from "../../assets/like.mp3"

export default function CommentSection({ postId }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/comment/addaComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: words,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setWords("");
        getcomments();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    console.log("yay");
  };
  const [words, setWords] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const getcomments = async () => {
    try {
      const res = await fetch("/api/comment/getpostComments/" + postId);
      const data = await res.json(); 
      if (res.ok) {
     setComments(data); 
     console.log(data); 
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
 
    getcomments(); 

  }, [postId]);

  console.log(currentUser);
  const likeHandle = async(commentId)=> {
if(!currentUser)
  {
    //add navigate to sign in here
     return; 
  }
  try {
    const res = await fetch("/api/comment/likeComment/"+commentId, {
      method:"PUT"
    })
    if(res.ok){
      const data = await res.json()
      setComments(comments.map((comment)=> {
        if(comment._id === commentId){
          const audio = new Audio('../../assets/like.mp3');
          audio.play();
          return {
            ...comment, likes: data.likes,
            countofLikes: data.countofLikes
          }
        }
        return comment;
      
      }))
    }
  } catch (error) {
    console.log(error)
  }
  }
  return (
    <div className="max-w-4xl p-4 mx-auto border-t-2 border-gray-400 mt-48 ">
      {currentUser ? (
        <div className="flex flex-row items-center text-gray-500 text-xs">
          <p>Logged in as: </p>
          <Link
            to={"/dashboard?tab=profile"}
            className=" flex flex-row  items-center text-blue-500 hover:text-blue-600  hover:scale-125 transition-all "
          >
            <img
              className=" rounded-full w-6 h-6 ml-5 mr-1"
              src={currentUser.photo}
            />
            <p className=""> @ {currentUser.username}</p>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/sign-in" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>{" "}
          to comment
        </div>
      )}

      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="p-5 m-5 border-2 dark:border-gray-500 border-dashed dark:hover:border-gray-200 rounded-lg border-gray-400 hover:border-gray-600 mb-24 mt-3"
        >
          <Textarea
            value={words}
            placeholder="Write a comment..."
            rows={"4"}
            maxLength={200}
            onChange={(e) => {
              setWords(e.target.value);
            }}
            className="resize-none"
          ></Textarea>
          <div className="flex  justify-between items-center mt-5">
            <p
              className="text-xs"
              style={{ color: words.length === 200 ? "red" : "inherit" }}
            >
              {words.length} / 200
            </p>
            <Button
              type="submut"
              size={"sm"}
              className="bg-blue-500 hover:bg-blue-600 text-white  rounded-lg "
              outline
            >
              Comment
            </Button>
          </div>
        </form>
      )}
      {comments.length ===0 ? (
        <p className="text-lg  mt-10 bg-slate-300 mx-auto p-4 align-center  font-semibold text-center text-slate-500 dark:text-slate-600 rounded-md">No Commens on this </p>
      )
    :
    <> 
     <div className="text-sm flex my-5 items-center gap-2 " >
       <p className="font-bold bg-gray-400 text-white px-4 p-3 rounded-full">
            {comments.length+" "}
        </p>  
             <span>
                 Comments   
            </span>
      
       
    </div>
   {comments.map((comment)=> 
   <CommentBox key={comment._id} com={comment} likeFunction = {likeHandle}></CommentBox>
   )}
    </>
  
    }
    </div>
  );
}
