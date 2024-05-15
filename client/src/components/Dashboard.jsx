import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SideComponent from './sub_components/SideComponent';
import ProfileComponent from './sub_components/ProfileComponent';
import DashPosts from './sub_components/DashPosts';
import DashUsers from './sub_components/DashUsers';
import DashComment from './sub_components/DashComment';
  import DashBoardComponent from './DashBoardComponent';
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

{
  tab ==="users" && <DashUsers></DashUsers>
}

{
  tab ==="comments" && <DashComment></DashComment>
}
{
   tab ==="dash" && <DashBoardComponent></DashBoardComponent>
}



    </div>
  )
}
