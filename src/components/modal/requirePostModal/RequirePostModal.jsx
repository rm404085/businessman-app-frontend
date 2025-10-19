
import React, { useEffect, useRef } from "react";
import { IoClose, IoEllipsisHorizontal, IoImage } from "react-icons/io5";

const RequirePostModal = ({
  open,
  setOpen,
  mediaPreview,
  setMediaPreview,
  fileRef,
  handleMedia,
  handlePost,
  setPostText,
  postText
  
}) => {

    const modalRef = useRef();

    useEffect(()=>{
        if(!open) return;

         const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
        setMediaPreview(null);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen, setMediaPreview]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}>

      </div>

      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        className={`
          relative bg-slate-50 rounded-t-3xl md:rounded-2xl shadow-2xl p-6 
          w-full md:w-[700px] h-[90vh] md:h-auto max-h-[90vh] overflow-y-auto 
          z-10 transition-all duration-300  bottom-0 md:relative
          ${open ? "animate-slideUp md:animate-fadeIn" : "translate-y-full"}
        `}
      >
        {/* Close button */}
        <button
          onClick={() => {
            setOpen(false);
            setMediaPreview(null);
          }}
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
        >
          <IoClose size={28} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-5">
          Create Requirement / Post
        </h2>

        {/* Text area */}
        <div>
            <div className="flex justify-between gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold">
            Y
          </div>
          <div>
            <label className="cursor-pointer flex items-center gap-2 text-green-600 hover:opacity-80 transition">
                <IoImage size={30} />
                <span className="hidden sm:inline">Photo/Video</span>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={handleMedia}
                />
              </label>
          </div>
         
        </div>
         <textarea
            rows={8}
            value={postText}
            onChange={(e)=>setPostText(e.target.value)}
            placeholder="Share your requirement..."
            className="flex-1 resize-none outline-none border border-x-violet-200 mt-2 w-full rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 text-base placeholder-gray-500 bg-transparent"
          ></textarea>
        </div>

       {mediaPreview && mediaPreview.length > 0 && (
  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
    {mediaPreview.map((src, index) => (
      <div key={index} className="relative bg-gray-100 rounded-xl overflow-hidden">
        {src.includes("video") ? (
          <video
            src={src}
            controls
            className="w-full h-40 object-cover rounded-xl"
          />
        ) : (
          <img
            src={src}
            alt={`preview-${index}`}
            className="w-full h-40 object-cover rounded-xl"
          />
        )}
        <button
          onClick={() =>
            setMediaPreview(mediaPreview.filter((_, i) => i !== index))
          }
          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
        >
          ✖
        </button>
      </div>
    ))}
  </div>
)}


        {/* Footer */}
        <div className="mt-5 border-t pt-4">
          <div className="flex items-center py-4 border-violet-200 rounded-lg border px-2 justify-between">
            {/* Left side text */}
            <div className="flex gap-4 text-gray-700 font-medium">
              <span className="text-sm sm:text-base">Add to your post</span>
            </div>

            <div className="flex gap-3">
              

              {/* Feeling */}
              <button className="text-yellow-500 hover:opacity-80 transition">
                😊
              </button>

              {/* Tag */}
              <button className="text-pink-500 hover:opacity-80 transition">
                🏷️
              </button>

              {/* Location */}
              <button className="text-indigo-500 hover:opacity-80 transition">
                📍
              </button>

              {/* 3-dot */}
              <button className="text-gray-500 hover:text-black transition">
                <IoEllipsisHorizontal size={24} />
              </button>
            </div>
          </div>

          {/* Post button full width */}
          <button onClick={handlePost} className="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition">
            Post
          </button>

          {/* Extra features for mobile below Post button */}
          <div className="mt-4 flex flex-wrap gap-3 md:hidden">
            <button className="flex-1 bg-gray-100 py-2 rounded-lg text-center text-sm font-medium hover:bg-gray-200 transition">
              Schedule Post
            </button>
            <button className="flex-1 bg-gray-100 py-2 rounded-lg text-center text-sm font-medium hover:bg-gray-200 transition">
              Poll
            </button>
            <button className="flex-1 bg-gray-100 py-2 rounded-lg text-center text-sm font-medium hover:bg-gray-200 transition">
              Tag Friends
            </button>
            <button className="flex-1 bg-gray-100 py-2 rounded-lg text-center text-sm font-medium hover:bg-gray-200 transition">
              Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirePostModal;
