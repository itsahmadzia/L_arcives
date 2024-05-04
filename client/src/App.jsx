import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./components/Home";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp.jsx";
import Header from "./components/sub_components/Header.jsx"
import FooterComponent from "./components/sub_components/FooterComponent";
import PrivateRoute from "./components/sub_components/PrivateRoute.jsx";

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
     
      </Routes>
    </BrowserRouter>
<FooterComponent></FooterComponent></>
  );
}
