import { IoMagnetSharp } from "react-icons/io5";
import { FaPhotoVideo, FaShoppingCart, FaShareAlt, FaMagnet } from "react-icons/fa";
import { useState } from "react";

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
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold hover:text-violet-900 text-sm">{video.company.name}</h4>
            {video.company.verified && (
              <span className="text-blue-500 text-xs">✔ Verified</span>
            )}
          </div>
          <div className="border border-yellow-500 p-2 rounded-full ">
            <IoMagnetSharp className="text-gray-600 text-3xl  cursor-pointer" />
          </div>
          
        </div>

        {/* Title */}
       <div className="mt-2 text-sm flex text-gray-700">
      <p>
        {expanded ? video.title : shortText + (video.title.length > 20 ? "..." : "")}
      </p>

      {video.title.length > 20 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600  font-medium mt-1"
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
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-60 object-cover rounded-sm" 
        />

        {/* Duration Badge */}
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
          {video.duration}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-around border-t p-2 text-lg text-gray-600">
        <button className="flex items-center gap-1   hover:text-yellow-900">
          <FaPhotoVideo /> Photo
        </button>
        <button className="flex items-center gap-1 hover:text-green-600">
          <FaShoppingCart /> Order
        </button>
        <button className="flex items-center gap-1 hover:text-red-600">
          <FaShareAlt /> Share
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
