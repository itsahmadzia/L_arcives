import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./components/Home";
import AdminPrivateRoute from "./components/sub_components/adminPrivateRoute.jsx";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp.jsx";
import Header from "./components/sub_components/Header.jsx"
import FooterComponent from "./components/sub_components/FooterComponent";
import PrivateRoute from "./components/sub_components/PrivateRoute.jsx";
import CreatePost from "./components/CreatePost.jsx";
import UpdatePost from "./components/UpdatePost.jsx";
import PostPage from "./components/PostPage.jsx";

export default function App() {
  return (
   <>
     <BrowserRouter>

<Header></Header>
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />}/>
    <Route element={<PrivateRoute/>} >
      <Route path="/dashboard" element={<Dashboard />}/>;
        </Route>
        
        <Route path="/projects" element={<Projects />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>

        <Route element={<AdminPrivateRoute/>} >
      <Route path="/create-post" element={<CreatePost />}/>;
      <Route path="/update-post/:postId" element={<UpdatePost></UpdatePost>}></Route>
        </Route>

      <Route path="/post/:slug" element={<PostPage></PostPage>}></Route>
      </Routes>
    </BrowserRouter>
<FooterComponent></FooterComponent></>
  );
}
