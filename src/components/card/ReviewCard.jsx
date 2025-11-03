import React, { useState } from "react";
import ReactPlayer from "react-player";
import {
  IoHeart,
  IoChatbubbleEllipses,
  IoShareSocial,
} from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review, companyName }) => {
  const [liked, setLiked] = useState(false);

  if (!review) return null;

  const customerPhoto =
    review?.customer?.photo || "https://via.placeholder.com/150";
  const customerName = review?.customer?.name || "Unknown User";

  // read-only rating from review data
  const rating = review?.rating || 0;

  // media array of objects [{ url, type }]
  const mediaItems = review?.media || [];

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md max-w-md mx-auto border border-gray-700 overflow-hidden flex flex-col w-full">
      {/* User Info */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-700 flex-shrink-0">
        <img
          src={customerPhoto}
          alt={customerName}
          className="w-10 h-10 rounded-full border border-gray-600 object-cover"
        />
        <h2 className="text-lg font-semibold">
          {customerName}{" "}
          {companyName && (
            <span className="text-sm text-gray-400 font-normal">
              <span className="text-orange-700 font-bold">Special Review</span>{" "}
              {companyName}
            </span>
          )}
        </h2>
      </div>

      {/* ⭐ Read-only Star Rating */}
      <div className="flex px-4 mt-2 space-x-1">
       {[...Array(5)].map((_, index) => (
  <FaStar
    key={index}
    size={20}
    className={index < review.rating ? "text-yellow-400" : "text-gray-600"}
  />
))}
      </div>

      {/* Review Content */}
      <div className="p-4 flex flex-col gap-1">
        <p className="text-gray-400 text-sm">
          {review?.text || review?.review?.content}
        </p>
        <span className="text-gray-500 text-xs">
          {review?.date || review?.review?.date || "Unknown date"}
        </span>
      </div>

      {/* Media Section */}
      <div className="relative w-full bg-black">
        {mediaItems.length > 0 ? (
          mediaItems.map((item, idx) =>
            item.type === "video" ? (
              <ReactPlayer
                key={idx}
                url={item.url}
                controls
                width="100%"
                height="100%"
                style={{ aspectRatio: "16/9" }}
              />
            ) : (
              <img
                key={idx}
                src={item.url}
                alt={`media-${idx}`}
                className="w-full object-cover"
                style={{ aspectRatio: "16/9" }}
              />
            )
          )
        ) : (
          <div className="flex items-center justify-center h-48 text-gray-500">
            No media available
          </div>
        )}
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
