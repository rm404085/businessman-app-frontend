import RequirePostCard from "@/components/card/RequirePostCard";
import RequirePostModal from "@/components/modal/requirePostModal/RequirePostModal";

import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { IoImage } from "react-icons/io5";

const  Require = () => {
  const [open, setOpen] = useState(false);
  const [mediaPreview, setMediaPreview] = useState([]);
  const [posts,setPosts] = useState([]);
  const [postText,setPostText] = useState("")
  const fileRef = useRef();


  useEffect(()=>{

    fetch("/require.json")
    .then((res)=>res.json())
    .then((data)=>{
      setPosts(data)
    })


  }, [])


   // ✅ Handle post submit
  const handlePost = () => {
    if (!postText.trim() && !mediaPreview) return;

    const newPost = {
      id: Date.now(),
      text: postText,
      media: mediaPreview,
    };

    setPosts([newPost, ...posts]); // add new post on top
    setPostText("");
    setMediaPreview([]);
    setOpen(false);
  };

  
   const handleMedia = (e) => {
  const files = Array.from(e.target.files || []);
  if (files.length > 0) {
    const previews = files.map((file) => URL.createObjectURL(file));
    setMediaPreview((prev) => [...prev, ...previews]); // আগের preview এর সাথে merge
  }
};

  return (
    <div className="min-h-screen mt-16  p-2 md:p-2">
      <div className="max-w-full mx-auto">
      

        {/* Composer Box */}
        <div onClick={() => setOpen(true)} className="rounded-2xl  p-4 flex items-center gap-3 w-full">
          {/* Profile */}
          <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
            Y
          </div>

          {/* Input */}
          <Input rows={1}
            placeholder="Share your requirement or post..."
            className="flex-1 resize-none  border-2 py-2 px-2  h-10 rounded-full focus:ring-0 text-sm md:text-base placeholder-gray-500 bg-transparent"></Input>


            {/* ✅ Modal Component */}
        <RequirePostModal
          open={open}
          setOpen={setOpen}
          mediaPreview={mediaPreview}
          setMediaPreview={setMediaPreview}
          fileRef={fileRef}
          handleMedia={handleMedia}
          handlePost={handlePost}
          setPostText={setPostText}
          postText={postText}
        />

          {/* Photo Upload */}
          <label className="cursor-pointer  text-green-600 text-2xl flex-shrink-0 hover:scale-110 transition">
            <IoImage
            size={30}
             />
            <input
             
              type="file"
              accept="image/*,video/*"
              className="hidden"
             
            />
          </label>
        </div>

       {/*  post  list */}

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {

          posts.map((post)=><RequirePostCard key={post.id} post={post} ></RequirePostCard>)
        }
       </div>


       
        
       
      </div>
    </div>
  );
}

export default Require;
