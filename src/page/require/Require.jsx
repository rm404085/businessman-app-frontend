import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
import { IoClose, IoImage } from "react-icons/io5";

const  Require = () => {
   const [open, setOpen] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);
  const fileRef = useRef();

   const handleMedia = (e) => {
    const file = e.target.files?.[0];
    if (file) setMediaPreview(URL.createObjectURL(file));
  };
  return (
    <div className="min-h-screen   p-2 md:p-8">
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


             {/* MODAL */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-4 relative animate-fadeIn">
              {/* Close button */}
              <button
                onClick={() => {
                  setOpen(false);
                  setMediaPreview(null);
                }}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                <IoClose size={24} />
              </button>

              {/* Header */}
              <h2 className="text-xl font-semibold text-center mb-3">
                Create Requirement / Post
              </h2>

              {/* Body */}
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold">
                  Y
                </div>
                <textarea
                  rows={4}
                  placeholder="Share your requirement..."
                  className="flex-1 resize-none outline-none border-none focus:ring-0 text-base placeholder-gray-500 bg-transparent"
                ></textarea>
              </div>

              {/* Media Preview */}
              {mediaPreview && (
                <div className="mt-3 relative bg-gray-100 p-3 rounded-xl">
                  <img
                    src={mediaPreview}
                    alt="preview"
                    className="w-full max-h-72 object-contain rounded-lg"
                  />
                  <button
                    onClick={() => setMediaPreview(null)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                  >
                    ✖
                  </button>
                </div>
              )}

              {/* Footer */}
              <div className="mt-4 border-t pt-3 flex justify-between items-center">
                <label className="cursor-pointer text-green-600 flex items-center gap-2 font-medium">
                  <IoImage size={22} /> Photo/Video
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleMedia}
                  />
                </label>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
          

          {/* Photo Upload */}
          <label className="cursor-pointer text-green-600 text-2xl flex-shrink-0 hover:scale-110 transition">
            <IoImage />
            <input
             
              type="file"
              accept="image/*,video/*"
              className="hidden"
             
            />
          </label>
        </div>

        {/* Media Preview */}
       
        
       
      </div>
    </div>
  );
}

export default Require;
