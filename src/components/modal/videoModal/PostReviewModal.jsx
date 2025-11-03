import React, { useRef, useEffect, useState } from "react";
import { IoClose, IoEllipsisHorizontal, IoImage } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { usePostContext } from "@/components/Provider/PostProvider/PostProvider";

const PostReviewModal = ({ setOpenPostReview, companyName }) => {
  const modalRef = useRef();
  const {
    postText,
    setPostText,
    mediaPreview,
    setMediaPreview,
    handleMedia,
    handlePost,
  } = usePostContext();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenPostReview(false);
        setMediaPreview([]);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [setOpenPostReview, setMediaPreview]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        setOpenPostReview(false);
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-slate-50 rounded-2xl shadow-2xl p-6 w-full md:w-[700px] max-h-[90vh] overflow-y-auto z-10"
      >
        {/* Close button */}
        <button
          onClick={() => {
            setOpenPostReview(false);
            setMediaPreview([]);
          }}
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
        >
          <IoClose size={28} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-5">
          Create Review / Post
        </h2>

        {/* ⭐ Rating Selection */}
        <div className="flex justify-center mb-4 space-x-1">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                key={index}
                type="button"
                className={`${
                  starValue <= (hover || rating)
                    ? "text-yellow-400"
                    : "text-gray-400"
                } focus:outline-none`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(null)}
                aria-label={`${starValue} Star`}
              >
                <FaStar size={26} />
              </button>
            );
          })}
        </div>

        {/* Text area */}
        <textarea
          rows={6}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Write your review or requirement..."
          className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 text-base placeholder-gray-500 bg-transparent"
        />

        {/* Media Upload */}
        <div className="mt-3">
          <label className="cursor-pointer flex items-center gap-2 text-green-600 hover:opacity-80 transition">
            <IoImage size={30} />
            <span>Photo/Video</span>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleMedia}
            />
          </label>
        </div>

        {/* Media Preview */}
        {mediaPreview.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {mediaPreview.map((item, index) => (
              <div
                key={index}
                className="relative bg-gray-100 rounded-xl overflow-hidden"
              >
                {item.type === "video" ? (
                  <video
                    src={item.url}
                    controls
                    className="w-full h-40 object-cover rounded-xl"
                  />
                ) : (
                  <img
                    src={item.url}
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

        {/* Post button */}
        <button
          onClick={() => {
            handlePost({ companyName, rating }); // ⭐ rating পাঠানো হলো
            setOpenPostReview(false);
          }}
          className="w-full mt-6 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostReviewModal;
