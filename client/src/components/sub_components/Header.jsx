import React from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import {useLocation} from 'react-router-dom';
export default function Header() {
    const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2 bg-slate-50">
      <Link
        to="/"
        className="self-center whitespace-nowrap  sm:text-xl font-semibold dark:text-white rounded-lg"
      >
        <span className="px-2 py-1   text-black font-extrabold font-logo2 text-5xl">
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
      <Button className="lg:hidden w-12 h-9 bg-white" pill color="grey">
        <AiOutlineSearch></AiOutlineSearch>
      </Button>
  
      <div className="flex gap-7 md:order-2">
        <Button
          className="w-12 h-11 sm:inline hidden bg-white focus:ring-1"
          color="black" gradientDuoTone="tealToLime" 
          pill
        >
          <FaMoon></FaMoon>
        </Button>
 
        <Link to="/sign-in">
          <Button
            className="  flex bg-center focus:ring-0 color-black"
            pill
            gradientDuoTone="tealToLime"
            outline
          >
            Sign in
          </Button>
        </Link>
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
