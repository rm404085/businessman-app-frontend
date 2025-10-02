import { IoMagnetSharp } from "react-icons/io5";
import { FaPhotoVideo, FaShoppingCart, FaShareAlt, FaMagnet } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router";


const VideoCard = ({ video }) => {
  const [expanded, setExpanded] = useState(false);

  const shortText = video.title.slice(0, 100);
  return (
    <div className="  rounded-xl   transition bg-white flex flex-col">
      {/* Top Section */}
      <div className="p-3 space-y-2">
        {/* Company Info */}
        <div className="flex items-center justify-between gap-2">
          <img
            src={video.company.avatar}
            alt={video.company.name}
            className="w-10 h-10 rounded-full border-2 border-sky-900 border-s-2 cursor-pointer hover:scale-110 "
          />
          <div>
            <h4 className="font-extrabold  hover:text-violet-900 text-lg">{video.company.name}</h4>
            
          </div>
          <div className="p-2 rounded-full   border-s-8 border-2 border-blue-900 shadow-md hover:shadow-lg cursor-pointer transform transition-all hover:scale-110">
  <IoMagnetSharp className=" text-2xl" />
</div>

          
        </div>

        {/* Title */}
       <div className="mt-2 text-sm flex  text-gray-700">
      <p>
        {expanded ? video.title : shortText + (video.title.length > 20 ? "..." : "")}
      </p>

      {video.title.length > 20 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600  font-light"
        >
          {expanded ? "Show less" : "More"}
        </button>
      )}
    </div>

        {/* Views + Uploaded */}
        <div className="text-gray-500 text-xs flex justify-between">
          <span>{video.views} views</span>
          <span>{video.uploaded}</span>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="relative hover:shadow-md cursor-pointer transform transition-all hover:scale-95">
  <img
    src={video.thumbnail}
    alt={video.title}
    className="w-full h-60 object-cover rounded-sm"
  />

  {/* Play Icon Center */}
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

  {/* Duration Badge */}
  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
    {video.duration}
  </span>
</div>


      {/* Action Buttons */}
      <div className="flex justify-around border-t p-2 text-lg text-gray-600">
       <Link to="/photo">
        <button className="flex items-center gap-1  hover:scale-125  hover:text-yellow-900">
          <FaPhotoVideo /> Photo
        </button></Link>
        <button className="flex items-center gap-1  hover:scale-125  hover:text-green-600">
          <FaShoppingCart /> Order
        </button>
        <button className="flex items-center gap-1  hover:scale-125  hover:text-red-600">
          <FaShareAlt /> Share
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
