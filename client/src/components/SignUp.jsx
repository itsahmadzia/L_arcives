import { Label, TextInput, Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error,seterror] = useState(null);
  const [loading , setLoading ] = useState(false);
const submitBtn= async (e)=>{
  console.log("nciscn")
  e.preventDefault();
  try {
    const r= await fetch("/api/auth/signUp",{
      method:'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
      
    })

    const d=await r.json()
    console.log(d);
  } catch (error) {
  //  console.log(error)
    
  }

}
  

  const handleChange = (e) => {
   let { id, value } = e.target;
   value = value.trim();
    setFormData((f)=> {
      f[id]= value; 
      return f;
    });
  //  console.log(formData);
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-10">
        <div className="flex-1  hover:scale-110 transition-all">
        <Link
        to="/"
        className="self-center whitespace-nowrap   font-semibold dark:text-white rounded-lg "
      >
        <span className="px-2 py-1   text-black font-extrabold font-logo2 text-8xl cursor-pointer  ">
          L
        </span>
        <span className="text-2xl">archives</span>
      </Link>
      <p className="text-sm mt-7 font-light text-justify ">
      🔍 Welcome to the L Archives – where pixels are sharp, and theories sharper! Dive into anime intrigue with us. Sign up now to join a community thriving on speculation, debates, and occasional existential crises induced by cliffhangers. 
      </p>
      <p className="text-sm mt-3 font-light text-justify ">
      So, grab your snacks, summon your spirit animals, and let's explore anime mysteries together! 🍿🐼🔍
      </p>
        </div>

        <div className="flex-1">

<form className="flex  gap-7 flex-col" onSubmit={submitBtn}>
  <div>
    <Label value="Enter your Username "></Label>
    <TextInput onChange={handleChange} type="text" placeholder="Username" id="username"></TextInput>
  </div>

  <div>
    <Label value="Enter your Email "></Label>
    <TextInput onChange={handleChange} type="email" placeholder="Email" id="email"></TextInput>
  </div>
  <div>
    <Label value="Enter your Password "></Label>
    <TextInput onChange={handleChange} type="password" placeholder="Password" id="password" ></TextInput>
  </div>
  <Button  outline gradientDuoTone="tealToLime" type="submit" pill >
        Sign Up
      </Button>
</form>
<div className="flex gap-4 mt-3 text-sm">
<span>Have an account? </span>


<Link to='/sign-in' className="font-small text-blue-800 dark:text-blue-500   "><p className=" relative group">
  <span>Sign In</span>
  <span className=" absolute -bottom-2 left-0 w-0 h-2 bg-blue-700 transition-all group-hover:w-full"></span>
</p> </Link>


</div>

        </div>
      </div>
    </div>
  );
}
