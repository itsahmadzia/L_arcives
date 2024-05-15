import React,{useState,useEffect} from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import {useLocation} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { toggle } from "../../redux/theme/themeSlice";
import {

  deleteUserSuccess,
} from "../../redux/user/userSlice";

export default function Header() {
  const location = useLocation();
  const [searchTerm,setSearchTerm]=useState("");
  const dispatch = useDispatch();
const changeTheme = ()=>{
  dispatch(toggle())
  console.log("here")
}
useEffect(() => {
  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl = urlParams.get('searchTerm');
  if (searchTermFromUrl) {
    setSearchTerm(searchTermFromUrl);
  }
}, [location.search]);

  const {currentUser}= useSelector(state => state.user);
    const path = useLocation().pathname;


    const logout= async()=> {
      const res = await fetch("/api/user/signout", 
      
      {
        method:'POST'
      })
      const d= await res.json();
      if(!res.ok){  
        console.log(d.message);
      }
      else {
        dispatch(deleteUserSuccess())//clear redux
      }
    }
  return (
    <Navbar className="border-b-2 " 
    >
      <Link
        to="/"
        className="self-center whitespace-nowrap  sm:text-xl font-semibold dark:text-white rounded-lg"
      >
        <span className="px-2 py-1   text-black font-extrabold font-logo2 text-5xl dark:text-white">
          L
        </span>
        <span className="text-sm">archives</span>
      </Link>

      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        ></TextInput>
      </form>
      <Button className="lg:hidden w-12 h-9" pill color="grey">
        <AiOutlineSearch ></AiOutlineSearch>
      </Button>
  
      <div className="flex gap-7 md:order-2">
        <Button onClick={changeTheme}
          className="w-12 h-11 sm:inline hidden bg-white focus:ring-1"
          color="black" gradientDuoTone="tealToLime" 
          pill
        >
          
          <FaMoon ></FaMoon>
        </Button>
 

 { currentUser ? (
<Dropdown arrowIcon={false} className="bg-lime-200 w-40"
inline
label={
  
  <Avatar
  img={currentUser.photo}
  rounded
  >

  </Avatar>
}
>

  <Dropdown.Header  >
    <span className="block text-md  truncate font-mainButtons font-bold tracking-wide text-black dark:text-neutral-50 text-center text-2xl">{currentUser.username}</span>

  </Dropdown.Header>
<Link to="/dashboard">
  <Dropdown.Header className="hover:bg-green-300 text-center font-main font-bold  transition-all text-stone-950 hover:dark:text-zinc-950">
    
      <span >Profile</span>
  
  </Dropdown.Header>
  </Link>
<Dropdown.Divider/>


<Dropdown.Header className="font-main font-bold hover:bg-green-300 text-center cursor-pointer hover:dark:text-zinc-950" onClick={logout}>
 <span >Sign out</span>
</Dropdown.Header>
</Dropdown>

 ) : (<Link to="/sign-in">
          <Button
            className="  flex bg-center focus:ring-0 color-black"
            pill
            gradientDuoTone="tealToLime"
            outline
          >
            Sign in
          </Button>
        </Link>)
        }
<Navbar.Toggle></Navbar.Toggle>
      </div>
      <Navbar.Collapse>
          <Navbar.Link active= {path=== "/"}  as={'div'}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active= {path=== "/about" }as={'div'}>
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active= {path=== "/projects"} as={'div'}>
            <Link to="/projects">Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
   
    </Navbar>
  );
}
