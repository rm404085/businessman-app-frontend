import React, { useState } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import {
  IoHeart,
  IoChatbubbleEllipses,
  IoShareSocial,
  IoMagnetSharp,
} from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

const ShortCard = ({ short }) => {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [comments, setComments] = useState(short?.comments || []);
  const [commentText, setCommentText] = useState("");

  const handleComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([...comments, { user: "You", text: commentText.trim() }]);
    setCommentText("");
  };

  return (
    <div className="flex flex-col rounded-sm lg:h-[600px] lg:flex-row w-full h-screen bg-black text-white">

      {/* VIDEO */}
      {/* 🎬 VIDEO CONTAINER */}
<div
  className="relative w-full lg:w-1/3 h-screen lg:h-[80vh] flex-shrink-0 group"
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
>
  {/* 🖥️ VIDEO PLAYER */}
  <ReactPlayer
    url={short.src}
    playing={hovered}
    loop
    muted={!hovered}
    controls={hovered}
    width="100%"
    height="100%"
    className="pointer-events-auto cursor-pointer"
  />

  {/* 📱 MOBILE PROFILE BAR */}
  <div className="absolute top-3 left-0 right-0 flex items-center justify-center md:hidden z-20 bg-black/30 backdrop-blur-sm py-1 rounded-full mx-2">
    {/* Avatar left */}
    <div className="absolute left-3 flex items-center">
      <img
        src={short.company.avatar}
        alt={short.company.name}
        className="w-8 h-8 rounded-full border border-white/40"
      />
    </div>

    {/* Name center */}
    <span className="text-sm font-semibold text-white truncate max-w-[50%] text-center">
      {short.company.name}
    </span>

    {/* Icon right */}
    <div className="absolute right-3 flex items-center justify-center p-[3px] rounded-full border border-blue-900 hover:shadow-lg cursor-pointer hover:scale-110 transition">
      <IoMagnetSharp className="text-lg" />
    </div>
  </div>

  {/* 📱 MOBILE TITLE AT BOTTOM */}
  <div className="absolute bottom-3 left-3 md:hidden bg-black/50 p-2 rounded-md backdrop-blur-sm z-20 w-[95%]">
    <p className="text-sm font-medium">{short.title}</p>
  </div>

  {/* 📱 MOBILE ACTION BUTTONS (Right side) */}
  <div className="absolute right-3 bottom-20 flex flex-col gap-4 lg:hidden z-20">
    <motion.button
      whileTap={{ scale: 1.3 }}
      onClick={() => setLiked(!liked)}
      className={`p-3 rounded-full bg-black/60 hover:bg-black/80 ${
        liked ? "text-red-500" : "text-white"
      }`}
    >
      <IoHeart className="text-2xl" />
    </motion.button>

    <motion.button
      whileTap={{ scale: 1.2 }}
      className="p-3 rounded-full bg-black/60 hover:bg-black/80"
    >
      <IoChatbubbleEllipses className="text-2xl" />
    </motion.button>

    <motion.button
      whileTap={{ scale: 1.2 }}
      className="p-3 rounded-full bg-black/60 hover:bg-black/80"
    >
      <IoShareSocial className="text-2xl" />
    </motion.button>

    <motion.button
      whileTap={{ scale: 1.2 }}
      className="p-3 rounded-full bg-black/60 hover:bg-black/80"
    >
      <FaShoppingCart className="text-2xl" />
    </motion.button>
  </div>
</div>


      {/* INFO PANEL FOR DESKTOP */}
      <div className="hidden lg:flex flex-1 flex-col overflow-y-auto p-4 gap-4 bg-[#0f0f0f] rounded-tr-xl rounded-br-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={short.company.avatar}
              alt={short.company.name}
              className="w-12 h-12 rounded-full border border-gray-300"
            />
            <div>
              <p className="font-semibold text-lg">{short.company.name}</p>
              <p className="text-sm text-gray-500">{short.company.tagline}</p>
            </div>
          </div>
        </div>

        <h2 className="font-semibold text-lg">{short.title}</h2>
        <p className="text-gray-400 text-sm">{short.description}</p>

        {short.photos?.length > 0 && (
          <div className="flex gap-2 overflow-x-auto">
            {short.photos.map((photo, i) => (
              <img
                key={i}
                src={photo}
                alt={`photo-${i}`}
                className="w-20 h-20 rounded-lg object-cover"
              />
            ))}
          </div>
        )}

        <div className="flex flex-col flex-grow overflow-y-auto bg-black/30 rounded-lg p-3">
          {comments.map((c, i) => (
            <div key={i} className="mb-2">
              <p className="text-sm font-semibold text-violet-300">{c.user}</p>
              <p className="text-sm text-gray-300">{c.text}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleComment} className="flex gap-2 mt-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-black/50 text-white p-2 rounded-lg focus:outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-violet-700 hover:bg-violet-800 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Send
          </button>
        </form>

        <div className="hidden lg:flex justify-between mt-4">
          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={() => setLiked(!liked)}
            className={`p-3 rounded-full bg-black/60 hover:bg-black/80 ${liked ? "text-red-500" : "text-white"}`}
          >
            <IoHeart className="text-2xl" />
          </motion.button>
          <motion.button whileTap={{ scale: 1.2 }} className="p-3 rounded-full bg-black/60 hover:bg-black/80">
            <IoChatbubbleEllipses className="text-2xl" />
          </motion.button>
          <motion.button whileTap={{ scale: 1.2 }} className="p-3 rounded-full bg-black/60 hover:bg-black/80">
            <IoShareSocial className="text-2xl" />
          </motion.button>
          <motion.button whileTap={{ scale: 1.2 }} className="p-3 rounded-full bg-black/60 hover:bg-black/80">
            <FaShoppingCart className="text-2xl" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ShortCard;
