import React,{useState,useEffect} from 'react'
import PostCard from './sub_components/PostCard';
import { Link } from 'react-router-dom';
import { HiOutlineUserCircle } from 'react-icons/hi';
import Homepage from './Homepage';
export default function Home() {
  const [recent,setrecent]= useState(null); 
  useEffect(() => {
 
    const fetchPost = async () => {
        try {
         
            const res = await fetch("/api/admin/getPosts?limit=9" );
            const data = await res.json();
            if (!!res.ok) {
                setrecent(data.posts);
                console.log(recent);
            } 
        } catch (error) {
          
            console.log(error);
        }
    };
    fetchPost();

}, []);
  return (
    <>
  <Homepage></Homepage>

        <div className="flex flex-col justify-center items-center mt-32 mb-10 border-b-2 border-green-800 gap-10 ">
    <h1 className="text-center mb-4">Recent Posts</h1>
    <div className="flex flex-wrap justify-center gap-10 md:flex-row md:gap-10 sm:flex-col sm:gap-10 ">
    {recent &&
        recent.map((p) => (
            <PostCard key={p._id} post={p}></PostCard>
        ))}
</div>
</div>
    </>

  )
}
