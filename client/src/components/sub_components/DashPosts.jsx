import React, { useState, useEffect } from "react";
import { Button, Table } from "flowbite-react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showmore,setshowmore]= useState(true);


  const handleshowmore = async() => {
    const s= posts.length;
    console.log(s)
    try {
      const response = await fetch("/api/admin/getPosts?userId="+currentUser._id+"&start="+s);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const responseData = await response.json();
      console.log(responseData);
      
      setPosts((prev)=>([...prev,...responseData.posts]));
      if(responseData.posts.length<9){
        setshowmore(false);
      }
      setLoading(false);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try { 
        const response = await fetch("/api/admin/getPosts?userId="+currentUser._id);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const responseData = await response.json();
        setPosts(responseData.posts);
        if(responseData.posts.length<9){
          setshowmore(false);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-thin scrollbar-track-gray-400 scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500">
      {currentUser.isAdmin && posts.length > 0 ? (<>
        <Table hoverable shadow="md" className="dark:text-white ">
          <Table.Head>
            <Table.HeadCell>Last Updated</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>Update</Table.HeadCell>
          </Table.Head>
         
            {posts.map((post) => (
               <Table.Body className="divide-y">
              <Table.Row key={post._id} className="bg-white  dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </Table.Cell>
                {/* Add image cell */}
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                  <img src={post.image} className="w-20 h-16 object-cover bg-gray-100" >
                  </img>
                  </Link>


                </Table.Cell>

                <Table.Cell>
                  <Link className="font-extrabold" to={`/post/${post.slug}`}>
                 {post.title}
                  </Link>

                  
                </Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>
                {/* Add delete and update cells */}
                <Table.Cell><span className="text-red-500 hover:text-red-600 cursor-pointer" >Delete</span></Table.Cell>


                <Table.Cell>
                  <Link className="text-blue-500 hover:text-blue-600"  to={`/update-post/${post._id}`}>
                <span >Edit</span>
                  </Link>

                  
                </Table.Cell>
              </Table.Row>  
              </Table.Body>
            ))}
        
        </Table>
        {
          showmore && (
            <div className="flex justify-center mt-3">
         <Button onClick={handleshowmore} className="mr-2" color = 'green' size = 'sm' outline>Show More</Button>
          </div>
          )
        }
   
     </>
      ) 
      : (
        <p>No Posts Found</p>
      )}
    </div>
  );
}
