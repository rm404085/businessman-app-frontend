import React, { useState } from "react";
import ReactPlayer from "react-player";
import {
  IoHeart,
  IoChatbubbleEllipses,
  IoShareSocial,
} from "react-icons/io5";

const ReviewCard = ({ review }) => {
  const [liked, setLiked] = useState(false);

  if (!review) return null; // Prevent render crash if no data

  const customerPhoto = review?.customer?.photo || "https://via.placeholder.com/150";
  const customerName = review?.customer?.name || "Unknown User";
  const isVideo = review?.type === "video";
  const mediaSrc = isVideo ? review?.src : review?.photos?.[0];

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md max-w-md mx-auto border border-gray-700 overflow-hidden flex flex-col w-full">
      {/* User Info */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-700 flex-shrink-0">
        <img
          src={customerPhoto}
          alt={customerName}
          className="w-10 h-10 rounded-full border border-gray-600 object-cover"
        />
        <h2 className="font-semibold">{customerName}</h2>
      </div>

      {/* Media with aspect ratio */}
      <div className="relative w-full bg-black">
        {isVideo && mediaSrc ? (
          <ReactPlayer
            url={mediaSrc}
            controls
            width="100%"
            height="100%"
            style={{ aspectRatio: "16/9" }}
          />
        ) : mediaSrc ? (
          <img
            src={mediaSrc}
            alt="review media"
            className="w-full object-cover"
            style={{ aspectRatio: "16/9" }}
          />
        ) : (
          <div className="flex items-center justify-center h-48 text-gray-500">
            No media available
          </div>
        )}
      </div>

      {/* Review Content */}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-semibold text-lg">{review?.review?.title}</h3>
        <p className="text-gray-400 text-sm">{review?.review?.content}</p>
        <span className="text-gray-500 text-xs">
          {review?.review?.date || "Unknown date"}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-around p-3 border-t border-gray-700 flex-shrink-0">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1 ${
            liked ? "text-red-500" : "text-gray-300"
          } hover:text-white`}
        >
          <IoHeart className="text-xl" /> Like
        </button>

        <button className="flex items-center gap-1 text-gray-300 hover:text-white">
          <IoChatbubbleEllipses className="text-xl" /> Comment
        </button>

        <button className="flex items-center gap-1 text-gray-300 hover:text-white">
          <IoShareSocial className="text-xl" /> Share
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
