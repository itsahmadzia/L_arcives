import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import {GoogleAuthProvider, signInWithPopup,getAuth} from "firebase/auth"
import {app} from "../firebase"
import { signInSuccess } from "../redux/user/userSlice.js"
import { useDispatch } from "react-redux";
//import  handleGoogleClick  from "./sub_components/handleGoogleClick.js";


export default function SignUp() {

 const auth = getAuth(app)
 const dispatch = useDispatch()
  const handleGoogleClick = async()=>{

 
   
   
console.log("CORRECTOOO")

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt:'select_account'
})
try {
const fromGoogle = await signInWithPopup(auth,provider)
console.log(fromGoogle)
const r = await fetch("/api/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(

        {
            name:fromGoogle.user.displayName,
            email: fromGoogle.user.email,
            googlePhotoURL : fromGoogle.user.photoURL

        }
    ),
  }); 
  const d = await r.json();
  if(r.ok){
    dispatch(signInSuccess(d))
    navigate("/")
  }

    
} catch (error) {
  
    console.log(error)
}

}
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorM, seterror] = useState(null);
  const [loading, setLoading] = useState(false);
  const submitBtn = async (e) => {
    console.log("nciscn");

    e.preventDefault();
    if (!formData.email || !formData.password || !formData.username) {
      seterror((e) => "Please Fill all the values ");
      return;
    }
    try {
      setLoading(true);
      seterror(null);
      const r = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const d = await r.json();
      if (d.success === false) {
        seterror(d.message);
      }
      console.log(d);
      setLoading(false);
      if(r.ok){
        navigate("/sign-in")
      }
    } catch (error) {
      seterror(error.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    seterror(null)
    let { id, value } = e.target;
    value = value.trim();
    setFormData((f) => {
      f[id] = value;
      return f;
    });
    //  console.log(formData);
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-10">
        <div className="flex-1  hover:scale-110 transition-all">
          <Link
            to="/"
            className="self-center whitespace-nowrap   font-semibold dark:text-white rounded-lg "
          >
            <span className="px-2 py-1  font-extrabold font-logo2 text-8xl cursor-pointer  ">
              L
            </span>
            <span className="text-2xl">archives</span>
          </Link>
          <p className="text-sm mt-7 font-light text-justify ">
            🔍 Welcome to the L Archives – where pixels are sharp, and theories
            sharper! Dive into anime intrigue with us. Sign up now to join a
            community thriving on speculation, debates, and occasional
            existential crises induced by cliffhangers.
          </p>
          <p className="text-sm mt-3 font-light text-justify ">
            So, grab your snacks, summon your spirit animals, and let's explore
            anime mysteries together! 🍿🐼🔍
          </p>
        </div>

        <div className="flex-1">
          <form className="flex  gap-7 flex-col" onSubmit={submitBtn}>
            <div>
              <Label value="Enter your Username "></Label>
              <TextInput
                onChange={handleChange}
                type="text"
                placeholder="Username"
                id="username"
              ></TextInput>
            </div>

            <div>
              <Label value="Enter your Email "></Label>
              <TextInput
                onChange={handleChange}
                type="email"
                placeholder="Email"
                id="email"
              ></TextInput>
            </div>
            <div>
              <Label value="Enter your Password "></Label>
              <TextInput
                onChange={handleChange}
                type="password"
                placeholder="Password"
                id="password"
              ></TextInput>
            </div>
            <Button
              outline
              gradientDuoTone="tealToLime"
              type="submit"
              pill
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm"></Spinner>
                 
                </>
              ) : (
                <span> Sign Up</span>
              )}
            </Button>
            <Button  onClick={handleGoogleClick}
               gradientDuoTone="redToYellow"
               outline
              type="button"
              pill
              disabled={loading}>
               <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262" className="h-5 w-6 mr-2"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
  <span className=" " >Continue with Google</span>
</Button>
          </form>
          <div className="flex gap-4 mt-3 text-sm">
            <span>Have an account? </span>

            <Link
              to="/sign-in"
              className="font-small text-blue-800 dark:text-blue-500   "
            >
              <p className=" relative group">
                <span>Sign In</span>
                <span className=" absolute -bottom-2 left-0 w-0 h-2 bg-blue-700 transition-all group-hover:w-full"></span>
              </p>{" "}
            </Link>
          </div>
          {errorM && (
            <Alert className="mt-10" color="failure">
              {errorM}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
