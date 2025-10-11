import {
  FaHeart,
  FaRegHeart,
  FaCommentAlt,
  FaShare,
  FaPhotoVideo,
  FaShoppingCart,
  FaShareAlt,
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";

const PhotoCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => setShowFullText(!showFullText);

  // ✂️ Text truncate logic
  const truncatedText =
    post.text && post.text.length > 100
      ? post.text.slice(0, 100) + "..."
      : post.text;

  return (
    <div className="bg-white rounded-xl m-1 p-1  shadow hover:shadow-lg transition overflow-hidden">
      {/* Header Section */}
      <div className="p-0 pb-0">
        <div className="flex items-center top-0 justify-between mb-3">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-10 h-10 rounded-full"
            />
            
          </div>
          <div>
              <p className="font-semibold">{post.user.name}</p>
              
            </div>

          {/* Follow + More Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFollowing(!following)}
              className={`text-sm font-semibold px-3 py-1 rounded-full border transition ${
                following
                  ? "bg-gray-200 text-gray-700 border-gray-300"
                  : "bg-violet-800 text-white border-blue-600 hover:bg-blue-700"
              }`}
            >
              {following ? "Following" : "Follow"}
            </button>

            {/* More Option Button */}
            <button className="text-gray-500 text-xl hover:text-gray-800">
              ⋮
            </button>
          </div>
        </div>

        {/* 📝 Text Section with "More" functionality */}
       <div className="flex justify-between">
         <p>
          {post.text && (
          <div className="text-gray-700 text-sm font-medium leading-snug mb-2">
            {showFullText ? post.text : truncatedText}
            {post.text.length > 20 && (
              <button
                onClick={toggleText}
                className="text-blue-600 ml-1 font-semibold hover:underline"
              >
                {showFullText ? "Show less" : "More"}
              </button>
            )}
            
          </div>
        )}
         </p>
        <span className="text-sm text-gray-500">{post.time}</span>
       </div>
      </div>

      {/* Main Image */}
      <img
        src={post.image}
        alt={post.text}
        className="w-full h-[350px] object-cover"
      />

      {/* 🖼️ Scrollable Swiper Gallery */}
      {post.gallery && post.gallery.length > 0 && (
        <div className="p-4">
          <Swiper
            spaceBetween={12}
            slidesPerView={3.3}
            grabCursor={true}
            modules={[Scrollbar]}
            scrollbar={{ draggable: true }}
          >
            {post.gallery.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`slide-${idx}`}
                  className="rounded-lg w-full h-24 object-cover hover:scale-105 transition-transform duration-300"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* ❤️ Action Buttons */}
      <div className="flex justify-around border-t p-2 text-lg text-gray-600">
        <Link to="/photo">
          <button className="flex items-center gap-1 hover:scale-125 hover:text-yellow-900 transition">
            <FaPhotoVideo /> Photo
          </button>
        </Link>

        <button className="flex items-center gap-1 hover:scale-125 hover:text-green-600 transition">
          <FaShoppingCart /> Order
        </button>

        <button className="flex items-center gap-1 hover:scale-125 hover:text-red-600 transition">
          <FaShareAlt /> Share
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
