import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function greeting() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon";
  } else if (currentHour >= 18 && currentHour < 20) {
    return "Good evening";
  } else {
    return "Good night";
  }
}

export default function ProfileComponent() {
  const { currentUser } = useSelector((state) => state.user);
  const [imgprog, setimgprog] = useState(null);
  const [imgerr, setimgerr] = useState(null);
  const [imgf, setimgf] = useState(null);
  const [imgurl, setimgurl] = useState(null);

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

  const uploadImage = async () => {
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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimgurl(downloadURL);
        });
      }
    );
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full ">
      <p className="my-3 text-center font-semibold text-2xl text-[rgb(144,238,144)]">
        <span className="font-logo2 sm:text-2xl md:text-8xl text-black  ">
          {greeting() + ""}
        </span>{" "}
        {"   "}
      </p>
      <p className="text-center mb-10 my-6 text-white cursor-pointer hover:scale-110 transition-all ">
        {currentUser.username}
      </p>
      
    
      <form className="flex flex-col gap-4">
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
          type="text"
          id="username"
          placeholder="Enter your username to update"
          defaultValue={currentUser.username}
          required
          minLength={6}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Enter your email to update"
          defaultValue={currentUser.email}
          required
        />

        <TextInput type="password" id="password" placeholder="Enter your password to update" defaultValue={currentUser.password} minLength={8}/>
        <Button type="submit" gradientDuoTone="tealToLime">
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer hover:bg-black rounded-md p-2 transition-all duration-30">
          Delete Account
        </span>
        <span className="cursor-pointer hover:bg-black rounded-md p-2 transition-all duration-300">
          Sign Out
        </span>
      </div>
    </div>
  );
}
