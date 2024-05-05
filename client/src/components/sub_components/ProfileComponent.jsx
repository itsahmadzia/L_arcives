import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
function greeting() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good Afternoon";
  } else if (currentHour >= 18 && currentHour < 20) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
}

export default function ProfileComponent() {
  const handleDeleteButton = async () => {
    setshowpopup(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id} `, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const dispatch = useDispatch();
  const [showpopup, setshowpopup] = useState(false);

  const [imageUploading, setimageUploading] = useState(false);

  const [successmessage, setsuccessmessage] = useState(false);

  const [errormessage, seterrormessage] = useState(null);

  const { currentUser ,loading } = useSelector((state) => state.user);
  const [imgprog, setimgprog] = useState(null);
  const [imgerr, setimgerr] = useState(null);
  const [imgf, setimgf] = useState(null);
  const [imgurl, setimgurl] = useState(null);
  const [formData, setformData] = useState({});

  const randomRGB = (e) => {
    console.log(e);
  };
  const fileRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimgf(file);
      setimgurl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imgf) {
      uploadImage();
    }
  }, [imgf]);

  const populateform = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };
  const submit = async (e) => {
    setsuccessmessage(false);
    seterrormessage(null);
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      seterrormessage("Please enter some values in the fields ");
      return;
    }
    if (imageUploading) {
      seterrormessage("Please wait for the image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        setsuccessmessage(true);
      }
    } catch (error) {
      seterrormessage(error.message);
      dispatch(updateFailure(error));
    }
  };
  
  const uploadImage = async () => {
    setimageUploading(true);
    setimgerr(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imgf.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imgf);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setimgprog(progress.toFixed(0));
      },
      (error) => {
        setimgerr(error.message);
        setimgprog(null);
        setimgf(null);
        setimgurl(null);
        setimageUploading(false);
        seterrormessage("Error uploading image ");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimgurl(downloadURL);
          setformData({ ...formData, photo: downloadURL });
          setimageUploading(false);
        });
      }
    );
  };

  const signoutaction = async()=> {
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
    <div className="max-w-lg mx-auto p-3 w-full mt-5  ">
      <p
        onClick={randomRGB}
        className="my-3 text-center font-semibold text-2xl text-[rgb(144,238,144)]"
      >
        <span
          className="hover:tracking-[8px] hover:text-gap
        cursor-pointer hover:scale-125  duration-500  sm:hover:bg-[rgb(0,0,0)] p-5 rounded-md font-logo sm:text-2xl md:text-4xl    "
        >
          {greeting() + ""}
        </span>{" "}
        {"   "}
      </p>
      <p className="text-center mb-10 my-9 cursor-pointer hover:scale-110 transition-all hover:font-bol duration-300">
        {currentUser.username}
      </p>

      <form className="flex flex-col gap-4" onSubmit={submit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full hover:scale-125 transition-all mb-3 duration-500"
          onClick={() => fileRef.current.click()}
        >
          {imgprog && (
            <CircularProgressbar
              value={imgprog || 0}
              text={`${imgprog}%`}
              strokeWidth={6}
              textColor="rgb(144, 238,144)"
              styles={{
                root: {
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                },
                path: {
                  stroke: `rgba(144, 238, 144, ${imgprog / 100})`,

                  strokeLinecap: "round",
                },
                text: {
                  fill: "rgb(144, 238,144)",
                  fontSize: "9px",
                },
              }}
            />
          )}
          <img
            src={imgurl || currentUser.photo}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-3 border-[rgb(144,238,144)] 
            hover:scale-105 transition-all  duration-500
            `}
          />
        </div>
        {imgerr && <Alert color="failure">{imgerr}</Alert>}
        <TextInput
          onChange={populateform}
          type="text"
          id="username"
          placeholder="Enter your username to update"
          defaultValue={currentUser.username}
          required
          minLength={6}
        />
        <TextInput
          onChange={populateform}
          type="email"
          id="email"
          placeholder="Enter your email to update"
          defaultValue={currentUser.email}
          required
        />

        <TextInput
          onChange={populateform}
          type="password"
          id="password"
          placeholder="Enter your password to update"
          minLength={8}
        />
        <Button disabled= {loading} type="submit" gradientDuoTone="tealToLime">
          Update
        </Button>
<Link to={"/create-post"} className="hover:scale-110 transition-all hover:font-bold duration-300 w-fit self-center mt-5">
     {currentUser.isAdmin && ( <Button  className="hover:scale-110 transition-all hover:font-bold duration-300 w-fit self-center " type="button"  gradientDuoTone="tealToLime" outline
        >
          + Create Post
        </Button>)}
</Link>
    
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span
          onClick={() => {
            setshowpopup(true);
          }}
          className="cursor-pointer hover:bg-[#000000] rounded-md p-2 transition-all duration-300"
        >
          Delete Account
        </span>
        <span onClick={signoutaction} className="cursor-pointer hover:bg-[#000000] rounded-md p-2 transition-all duration-300">
          Sign Out
        </span>
      </div>
      {successmessage && (
        <Alert color={"success"}>User updated successfully</Alert>
      )}
      {errormessage && <Alert color={"failure"}>{errormessage}</Alert>}

      <Modal
        show={showpopup}
        onClose={() => {
          setshowpopup(false);
        }}
        popup
        size="md"
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="rounded-full w-24 h-24 text-center mx-auto mb-10">
            <img
              className="rounded-full"
              src="https://i.pinimg.com/736x/16/7f/2d/167f2db72c331c663aa805a99e2f4df0.jpg"
            ></img>
          </div>
          <h2 className="text-center mb-5 text-lg text-gray-500 dark:text-white">
            Are You sure you want to delete your account??
          </h2>

          <div className="flex justify-center gap-5">
            <Button color="failure" onClick={handleDeleteButton}>
              Yes I am gay
            </Button>

            <Button
              color="red"
              onClick={() => {
                setshowpopup(false);
              }}
            >
              No cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
