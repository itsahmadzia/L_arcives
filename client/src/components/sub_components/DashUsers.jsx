import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "flowbite-react";
import { useSelector } from "react-redux";
import { HiCheck, HiCheckCircle } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import Loading from "./Loading";


export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showmodal, setshowmodal] = useState(false);
  const [posttoDelete, setposttoDelete] = useState("");
  const [visible, setVisible] = useState(9); 


  const getDuration = (dateString) => {
    const dateObject = new Date(dateString);
    
    if (isNaN(dateObject.getTime())) {
      return "Invalid date";
    }
  
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();
    
    return `${monthName} ${year}`;
  };
  const handleDeleteButton = async () => {
    try {
      await fetch("/api/user/delete/" + posttoDelete, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => {
        if (res.ok) {
          window.location.reload();
        }
        else { console.log(res) 
            setshowmodal(false);
            alert("CANNOT delete this user");
        }
      })
    }
    catch (error) {
      console.log(error) 
    }
  }

  const handleshowmore = () => {
    setVisible((prevValue) => prevValue + 9);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/user/getUser");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const responseData = await response.json();
        setUsers(responseData.users);
        console.log(users)

        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchPosts();
  }, []);
  if(loading){
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-thin scrollbar-track-gray-400 scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable shadow="md" className="dark:text-white ">
            <Table.Head>
              <Table.HeadCell>Member since</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>UserName</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
            </Table.Head>

            {users.slice(0, visible).map((user) => ( // Changed this line
              <Table.Body className="divide-y">
                <Table.Row key={user._id} className="bg-white  dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {getDuration(user.createdAt)}
                  </Table.Cell>
                  {/* Add image cell */}
                  <Table.Cell>
                    <div className="w-30 h-30 rounded-full">
                         <img loading="lazy"  src={user.photo} className="sm:w-16 sm:h-16
                  object-cover bg-gray-100 rounded-full " >
                    </img>
                    </div>
                   
                  </Table.Cell>

                  <Table.Cell>
                    {user.username}
                  </Table.Cell>
             
                  {/* Add delete and update cells */}
                  <Table.Cell><span onClick={async () => {
                    setposttoDelete(user._id);
                    setshowmodal(true);
                  }} className="text-red-500 hover:text-red-600 cursor-pointer" >Delete</span></Table.Cell>

                  <Table.Cell>{(user.isAdmin)?<HiCheck color="green" size={28} ></HiCheck> : <IoCloseSharp size={28} color="red" />}</Table.Cell>
                 
                </Table.Row>
              </Table.Body>
            ))}

          </Table>
          {
            users.length > visible && (
              <div className="flex justify-center mt-3">
                <Button onClick={handleshowmore} className="mr-2" color='success' size='sm' outline>Show More</Button>
              </div>
            )
          }

        </>
      )
        : (
          <p>No Users Found</p>
        )}
      <Modal
        show={showmodal}
        onClose={() => {
          setshowmodal(false);
        }}
        popup
        size="md"
      >
        <Modal.Header>Delete Post</Modal.Header> {/* Added this line */}
        <Modal.Body>
          <div className="rounded-full w-24 h-24 text-center mx-auto mb-10">
            <img
            loading="lazy"
              className="rounded-full"
              src="https://i.pinimg.com/736x/16/7f/2d/167f2db72c331c663aa805a99e2f4df0.jpg"
            ></img>
          </div>
          <h2 className="text-center mb-5 text-lg text-gray-500 dark:text-white">
            Are You sure you want to delete your post??
          </h2>

          <div className="flex justify-center gap-5">
            <Button color="failure" onClick={handleDeleteButton}>
              Yes
            </Button>

            <Button
              color="red"
              onClick={() => {
                setshowmodal(false);
              }}
            >
              No cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
}