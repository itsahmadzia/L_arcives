import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.jsx";
import {useNavigate,useParams} from "react-router-dom";
import {useSelector} from "react-redux"
export default function UpdatePost() {

  
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const {postId}=useParams();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(`/api/admin/getPosts?postId=${postId}`, {
          method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
          setshowerror(data.message);
        } else {
          setformData(data.posts[0]); // post id here 
        }
      } catch (error) {
        // handle error
        console.error(error);
      }
    };
    getPosts();
  }, [postId]);
   
  const [file, setfile] = useState(null);
  const [imgprog, setimgprog] = useState(null);
  const [errormessage, seterrormessage] = useState(null);
  const [imgurl, setimgurl] = useState(null);
  const [formData, setformData] = useState({});
  const [showerror,setshowerror] = useState(null);


  console.log(formData);



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await fetch(`/api/admin/updatePost/${formData._id}/${currentUser._id}`,{ 
        method: "PUT",
        headers: {
          "Content-Type": "application/json", 
        },
         body: JSON.stringify(formData),
       
      } )
      const d = await res.json();
   
      if(!res.ok){
        setshowerror(d.message);
        return; 


      }
      else {
setshowerror(null);
navigate("/post/"+d.slug)
      }
  }
  catch(error){
setshowerror("Something went wrong!!!");

  } 
}

  const handleuploadImage = async () => {
    try {
      if (!file && (!formData.content || !formData.title)) {
        seterrormessage("Please select an image");
        return;
      }
      seterrormessage(null);
      const storage = getStorage(app);
      const fname = new Date().getTime().toString();
      console.log(fname);
      const storageRef = ref(storage, fname);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setimgprog(progress.toFixed(0));
        },
        (error) => {
          setimgprog(null);

          seterrormessage("Error uploading image ");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setimgurl(downloadURL);
            setimgprog(null)
            console.log(downloadURL);
            setformData({ ...formData, image: downloadURL });
            //setimageUploading(false);
          });
        }
      );
    } catch (error) {
      seterrormessage("Something went wrong");
      setimgprog(null);
      console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen ">
      <h1 className="text-center text-2xl font-bold mb-3 ">Update Post</h1>

      <form  onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
          onChange={(e) => {
            setformData({ ...formData, title: e.target.value });
          }
          }
            type="text"
            placeholder="Title"
            className="flex-1"
            required
            defaultValue={formData.title}
            
            
          ></TextInput>
          <Select  
          value = {formData.category}
          onChange={(e)=>{
            setformData({ ...formData, category: e.target.value });
         
          }
        }
          >
            <option value="uncategorized">Select Category</option>
            <option value="theory">Theory</option>
            <option value="fact">Fact</option>
            <option value="review">Review</option>
            <option value="manga">Manga</option>
          
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between border-2 border-gray-300 hover:border-gray-800 dark:border-gray-800 dark:hover:border-gray-200 border-dashed dark:text-white p-8 mb-6">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              setfile(e.target.files[0]);
            }}
          />

          <Button
            color={"green"}
            size={"sm"}
            outline
            className="bg-[#008356] py-1"
            onClick={handleuploadImage}
          >
            {imgprog ? (
              <div className="w-10 h-10 ">
                <CircularProgressbar
                  styles={{
                    path: {
                      stroke: `rgba(144, 238, 144, ${imgprog / 100})`,

                      strokeLinecap: "round",
                    },
                    text: {
                      fill: "rgb(88,88,88)",
                      fontSize: "18px",
                    },
                  }}
                  value={imgprog}
                  text={`${imgprog}%`}
                ></CircularProgressbar>
              </div>
            ) : (
              "Upload"
            )}
          </Button>
        </div>


        {errormessage
        &&
        <Alert color={'failure'}> {errormessage}</Alert>
        
        }


        {formData.image && (<img className="w-auto h-auto object-cover resize-none" src={formData.image}></img>)}

        <ReactQuill
        onChange={(value)=> {
          setformData({ ...formData, content: value });
        }}
        value={formData.content}
          theme="snow"
          placeholder="Your content...."
          className="p-4 border-2 border-gray-300 hover:border-gray-800  dark:border-gray-800 dark:hover:border-gray-200 border-dashed dark:text-white  dark:font-normal"
        ></ReactQuill>

        <Button type="submit" color={"green"} className="py-2">
        Update  Post
        </Button>

        {showerror &&
        <Alert color={'failure'}>
          {showerror}
        </Alert>
        }
      </form>
    </div>
  );
}
