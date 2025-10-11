import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import ReactPlayer from "react-player"; // ✅ import ReactPlayer
import {
  IoHeart,
  IoChatbubbleEllipses,
  IoShareSocial,
  IoDownload,
  IoBookmark,
  IoHome,
  IoMagnetSharp,
} from "react-icons/io5";
import { FaPhotoVideo, FaShoppingCart } from "react-icons/fa";

const ManufactureCard = ({ video }) => {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false); // ✅ hover state

  const shortText = video.title.slice(0, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-gray-200 overflow-hidden bg-white flex flex-col"
    >
      {/* --------- TOP: Company Info ---------- */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={video.company.avatar}
            alt={video.company.name}
            className="w-10 h-10 rounded-full border-2 border-violet-900 cursor-pointer hover:scale-110 transition-transform"
          />
          <div>
            <h4 className="font-bold hover:text-violet-900 text-base">
              {video.company.name}
            </h4>
            <p className="text-xs text-gray-500">{video.company.tagline}</p>
          </div>
        </div>

        {/* Follow button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="px-3 py-1 text-sm font-semibold bg-gradient-to-r from-violet-700 to-indigo-800 text-white rounded-full shadow hover:shadow-lg hover:scale-105 transition"
        >
          Follow
        </motion.button>
      </div>

      {/* --------- Title / Description ---------- */}
      <div className="px-4 text-gray-700 text-sm">
        <p>
          {expanded ? video.title : shortText + (video.title.length > 100 ? "..." : "")}
        </p>
        {video.title.length > 100 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 font-medium ml-2"
          >
            {expanded ? "Show less" : "More"}
          </button>
        )}
      </div>

      {/* Optional tagline line */}
      {video.line && (
        <div className="flex items-center justify-center gap-2 text-gray-400 text-xs my-2">
          <span className="h-px w-8 bg-gray-300"></span>
          <IoMagnetSharp className="text-violet-700" />
          <span>{video.line}</span>
          <span className="h-px w-8 bg-gray-300"></span>
        </div>
      )}

      {/* --------- Video Player ---------- */}
      <motion.div
        onMouseEnter={() => setHovered(true)} // ✅ hover enter
        onMouseLeave={() => setHovered(false)} // ✅ hover leave
        whileHover={{ scale: 0.97 }}
        className="relative cursor-pointer"
      >
        <ReactPlayer
          url={video.thumbnail}           // video source
          controls={hovered}         // only show controls on hover
          playing={hovered}          // autoplay on hover
          muted={!hovered}           // default muted
          width="100%"
          height="240px"
        />

        {/* Optional Play Overlay */}
        {!hovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/60 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.25l13.5 6.75-13.5 6.75V5.25z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Duration */}
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </span>
      </motion.div>

      {/* --------- Stats ---------- */}
      <div className="flex justify-between px-4 text-xs text-gray-500 py-2 border-b">
        <span>{video.views} views</span>
        <span>{video.uploaded}</span>
      </div>

      {/* --------- Action Buttons ---------- */}
      <div className="flex justify-around items-center py-3 text-gray-700">
        <motion.button
          whileTap={{ scale: 1.2 }}
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1 ${liked ? "text-red-600" : "hover:text-red-600"}`}
        >
          <IoHeart /> {liked ? "Liked" : "Like"}
        </motion.button>

        <motion.button whileTap={{ scale: 1.2 }} className="flex items-center gap-1 hover:text-blue-600">
          <IoChatbubbleEllipses /> Comment
        </motion.button>

        <motion.button whileTap={{ scale: 1.2 }} className="flex items-center gap-1 hover:text-green-600">
          <IoShareSocial /> Share
        </motion.button>

        <motion.button
          whileTap={{ scale: 1.2 }}
          onClick={() => setSaved(!saved)}
          className={`flex items-center gap-1 ${saved ? "text-yellow-500" : "hover:text-yellow-500"}`}
        >
          <IoBookmark /> {saved ? "Saved" : "Save"}
        </motion.button>

        <motion.button whileTap={{ scale: 1.2 }} className="flex items-center gap-1 hover:text-indigo-700">
          <IoDownload /> Download
        </motion.button>
      </div>

      {/* --------- Extra Links ---------- */}
      <div className="flex justify-around border-t p-3 text-gray-700 text-sm">
        <Link to="/photo" className="flex items-center gap-1 hover:scale-110 hover:text-yellow-700 transition">
          <FaPhotoVideo /> Photo
        </Link>
        <button className="flex items-center gap-1 hover:scale-110 hover:text-green-700 transition">
          <FaShoppingCart /> Order
        </button>
        <button className="flex items-center gap-1 hover:scale-110 hover:text-red-700 transition">
          <IoHome /> Visit
        </button>
      </div>
    </motion.div>
  );
};

export default ManufactureCard;
