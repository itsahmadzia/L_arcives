import React, { useEffect, useState } from "react";
import moment from "moment";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button, Textarea } from "flowbite-react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";

export default function CommentBox({ com, likeFunction }) {
  const [editMode, seteditMode] = useState(false);
  const [editwords,seteditwords]=useState(com.content);
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const handleEdit = () => {
    seteditMode(true);
  };
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
    <>
    {!editMode && (
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
          <button
            type="button"
            className="text-gray-400 hover:text-blue-300"
            onClick={() => {
              likeFunction(com._id);
            }}
          >
            <div>
              <FaThumbsUp
              className={`hover:scale-125 duration-300 transition-all ${
                com.likes.includes(currentUser._id) && "text-blue-700"
              }`}
            ></FaThumbsUp>
            </div>
            
          </button>
          <p>
            {com.countofLikes} {com.countofLikes === 1 ? "Like" : "Likes"}
          </p>
          <button>
                <CiEdit
            onClick={handleEdit}
            className="ml-5 h-4 text-gray-400 cursor-pointer hover:text-green-500 hover:scale-125 duration-300 transition-all  "
          ></CiEdit>
          </button>
      
<button>
  <RiDeleteBin5Line className=" text-gray-400 cursor-pointer h-4 hover:text-red-500 hover:scale-125 duration-300 transition-all" />
</button>

        </div>
      </div>
   
    )}
  
    {editMode && (
      <div className="mb-5  pt-12 p-5 m-5 border-2 dark:border-gray-500 border-dotted dark:hover:border-gray-200 rounded-lg border-gray-400 hover:border-gray-600">
        <Textarea onChange={(e)=> {
seteditwords(e.target.value)
        }} defaultValue={com.content} rows={3} maxLength={200}></Textarea>

<div>
    <p className="mt-3">
          <span className="font-bold text-xs ">Commented by:</span> <span className="italic">{user.username}</span>
        </p>

        <p
              className="text-xs"
              style={{ color: editwords.length === 200 ? "red" : "inherit" }}
            >
              {editwords.length} / 200
            </p>
</div>
      
        

<div className="flex items-end justify-end mt-5 gap-5">
    <Button outline color={"success"}  value={"Save"}>
          Save
          
        </Button>

    <Button outline color={"failure"} onClick={()=> {
      seteditMode(false);
      seteditwords(com.content);
    }}  value={"Cancel"}>
          Cancel
          
        </Button>
</div>
      
      </div>
    )}
  

  </>
  
  );
}
