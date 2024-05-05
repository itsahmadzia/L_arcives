import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SideComponent from './sub_components/SideComponent';
import ProfileComponent from './sub_components/ProfileComponent';
import DashPosts from './sub_components/DashPosts';
export default function Dashboard() {
  const location = useLocation();
  const [tab,setTab]=useState("");
  useEffect(
    () =>{
      const url=(new URLSearchParams(location.search));
    const tab= url.get("tab");
    if(tab)
    setTab(tab)
    console.log(tab);
    }
  ,[location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row '>
     <div className=''>
      <SideComponent></SideComponent>
     </div>

    
    { (tab==="profile") && <ProfileComponent></ProfileComponent>}
    
{
  (tab==="posts" && <DashPosts></DashPosts>)
}



    </div>
  )
}
