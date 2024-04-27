import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInStart,signInSuccess,signInFailure,signInRedo
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
 let { loading, error  } = useSelector((state) => {
  return state.user;
 });
  const submitBtn = async (e) => {
    console.log("nciscn");

    e.preventDefault();
    if (!formData.username || !formData.password) {
      return dispatch(signInFailure("Please enter all values "));
    }
    try {
      dispatch(signInStart());
      const r = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const d = await r.json();
      if (d.success === false) {
        return dispatch(signInFailure(d.message));
      }
      console.log(d);

      if (r.ok===true) {
       dispatch(signInSuccess(d));
        navigate("/");
      }
    } catch (error) {
      return dispatch(signInFailure(error.message));
    }
  };

  const handleChange = (e) => {
 
    dispatch(signInRedo())
    let { id, value } = e.target;
    value = value.trim();
    setFormData((f) => {
      f[id] = value;
      return f;
    });
  console.log(formData);
  };
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
              <Label value="Enter your Username or Email "></Label>
              <TextInput
                onChange={handleChange}
                type="text"
                placeholder="Username or Email"
                id="username"
              ></TextInput>
            </div>

            <div>
              <Label value="Enter your Password "></Label>
              <TextInput
                onChange={handleChange}
                type="password"
                placeholder="********"
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
                <span> Sign In</span>
              )}
            </Button>
          </form>
          <div className="flex gap-4 mt-3 text-sm">
            <span>Don't hava an account?</span>

            <Link
              to="/sign-up"
              className="font-small text-blue-800 dark:text-blue-500   "
            >
              <p className=" relative group">
                <span>Sign Up</span>
                <span className=" absolute -bottom-2 left-0 w-0 h-2 bg-blue-700 transition-all group-hover:w-full"></span>
              </p>{" "}
            </Link>
          </div>
          {error && (
            <Alert className="mt-10" color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
