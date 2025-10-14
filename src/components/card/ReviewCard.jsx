import React, { useState } from "react";
import ReactPlayer from "react-player";
import {
  IoEllipsisVertical,
  IoHeart,
  IoChatbubbleEllipses,
  IoShareSocial,
} from "react-icons/io5";
import { motion } from "framer-motion";

const ReviewCard = ({ review }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [comments, setComments] = useState(review?.comments || []);
  const [commentText, setCommentText] = useState("");

  const handleComment = (e) =>{
    e.preventDefault();
    if(!commentText.trim()) return;
    setComments([...comments, {user:"You", text: commentText.trim() }]);
    setCommentText("")


  }

  const toggleText = () => setShowFullText(!showFullText);

  const truncatedText =
    review.review.description && review.review.description.length > 90
      ? review.review.description.slice(0, 90) + "..."
      : review.review.description;

  return (
    <div className="bg-gray-900 text-white rounded-2xl shadow-lg  overflow-hidden max-w-4xl w-full mx-auto border border-gray-700 ">
      {/* ========== CUSTOMER HEADER ========== */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <img
            src={review.customer.photo}
            alt={review.customer.name}
            className="w-10 h-10 rounded-full border border-gray-600"
          />
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-semibold">{review.customer.name}</h2>
            <p className="text-xs text-gray-500">{review.review.date}</p>
          </div>
        </div>
        <IoEllipsisVertical className="text-2xl cursor-pointer hover:text-gray-400" />
      </div>

      {/* ========== DESCRIPTION ========== */}
      <div className="p-3 border-b border-gray-700">
        {review.review.description && (
          <div className="text-gray-300 text-sm leading-snug">
            {showFullText ? review.review.description : truncatedText}
            {review.review.description.length > 20 && (
              <button
                onClick={toggleText}
                className="text-blue-600 ml-1 font-semibold hover:underline"
              >
                {showFullText ? "Show Less" : "More"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ========== CONTENT + COMPANY + GALLERY (Responsive Layout) ========== */}
      <div className="flex flex-col lg:flex-row lg:items-start">
        {/* ===== VIDEO or PHOTO ===== */}
        <div className="relative w-full lg:w-[70%] h-[300px] md:h-[400px] lg:h-[380px] bg-black">
          {review.type === "video" ? (
            <ReactPlayer
              url={review.src}
              controls
              width="100%"
              height="100%"
              className="rounded-lg"
            />
          ) : (
            <img
              src={review.photos[0]}
              alt="post-photo"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>

        {/* ===== RIGHT SIDE (Desktop only) ===== */}
        <div className="hidden lg:flex flex-col w-[30%] border-l border-gray-700 p-4">
          {/* Company Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src={review.company.avatar}
                alt={review.company.name}
                className="w-10 h-10 rounded-full border border-gray-600"
              />
              <h3 className="font-semibold">{review.company.name}</h3>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1 px-3 rounded-full">
              Follow
            </button>
          </div>

          {/* Rating */}
          <div className="flex mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < review.review.rating ? "text-yellow-400" : "text-gray-600"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          {/* Gallery (Vertical Scroll) */}
          {review.gallery?.length > 0 && (
            <div className="overflow-y-auto max-h-[200px] pr-1 space-y-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {review.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`gallery-${i}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== MOBILE Company + Rating + Gallery ===== */}
      <div className="flex flex-col lg:hidden border-t border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={review.company.avatar}
              alt={review.company.name}
              className="w-10 h-10 rounded-full border border-gray-600"
            />
             </div>
           <div className=" flex justify-center items-center flex-col">
             <h3 className="font-semibold">{review.company.name}</h3>
             {/* Rating */}
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-lg ${
                i < review.review.rating ? "text-yellow-400" : "text-gray-600"
              }`}
            >
              ★
            </span>
          ))}
        </div>
           </div>
         
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1 px-3 rounded-full">
            Follow
          </button>
        </div>

       

        {/* Gallery (Horizontal Scroll for Mobile) */}
        {review.gallery?.length > 0 && (
          <div className="mt-3 overflow-x-auto flex gap-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {review.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`gallery-${i}`}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
            ))}
          </div>
        )}
      </div>

      {/* ========== ACTION BUTTONS ========== */}
      <div className="flex justify-around border-t border-gray-800 py-3">
        <motion.button
          whileTap={{ scale: 1.3 }}
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1 ${
            liked ? "text-red-500" : "text-gray-300"
          } hover:text-white`}
        >
          <IoHeart className="text-xl" /> Like
        </motion.button>
        <motion.button
          whileTap={{ scale: 1.2 }}
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 text-gray-300 hover:text-white"
        >
          <IoChatbubbleEllipses className="text-xl" /> Comment
        </motion.button>
        <motion.button
          whileTap={{ scale: 1.2 }}
          className="flex items-center gap-1 text-gray-300 hover:text-white"
        >
          <IoShareSocial className="text-xl" /> Share
        </motion.button>
      </div>

      {/* ========== COMMENTS SECTION ========== */}
       <div className="flex flex-col flex-grow overflow-y-auto max-h-28 bg-black/30 rounded-lg p-3">
          {comments.map((c, i) => (
            <div key={i} className="mb-2">
              <p className="text-sm font-semibold text-violet-300">{c.user}</p>
              <p className="text-sm text-gray-300">{c.text}</p>
            </div>
          ))}
        </div>
      
       <form onSubmit={handleComment} className="flex gap-2 mt-6">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-black/50 text-white p-2 rounded-lg focus:outline-none text-sm"
          />
          <button
            type="submit"
            className=" hover:bg-slate-100  px-4 hover:text-black py-1 rounded-lg text-sm font-semibold"
          >
            Send
          </button>
        </form>
     
    </div>
  );
};

export default ReviewCard;
