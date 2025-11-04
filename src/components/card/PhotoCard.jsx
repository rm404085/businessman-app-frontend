import {
  FaPhotoVideo,
  FaShoppingCart,
  FaShareAlt,
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/scrollbar";
import SearchButton from "../ui/SearchBar";

const PhotoCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [mainImage, setMainImage] = useState(post.image);

  const navigate = useNavigate();

  const toggleText = () => setShowFullText(!showFullText);
const handleCardClick = () => {
  console.log("Card clicked", post.id);
  navigate(`/photo/${post.id}`);
};

  // ✂️ Text truncate logic
  const truncatedText =
    post.text && post.text.length > 30
      ? post.text.slice(0, 30) + "..."
      : post.text;

  return (
    <div 
    onClick={handleCardClick}
    className="bg-white  rounded-xl md:m-2 md:p-2 shadow hover:shadow-lg transition overflow-hidden">
      {/* 🧍‍♂️ Header Section */}
      <div className="flex items-center justify-between mb-3">
       <div className="hidden md:block">
         <div className="flex items-center gap-1 md:gap-3">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="md:w-10 md:h-10 w-7 h-7 rounded-full"
          />
          <div>
            <p className="md:font-semibold font-medium text-sm">{post.user.name}</p>
            <span className="text-xs hidden md:block text-gray-500">{post.time}</span>
          </div>
        </div>
       </div>

        {/* Follow Button - Only show on larger screens */}
        <div className="hidden sm:flex items-center gap-2">
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

          <button className="text-gray-500 text-xl hover:text-gray-800">
            ⋮
          </button>
        </div>
      </div>
      

      {/* 🖼️ Main Image */}
      <img
        src={mainImage}
        alt={post.name}
        className="w-full h-[180px] md:h-[350px] object-cover rounded-sm md:rounded-md"
      />
{/* mobile view */}
<div className="md:hidden block">
  <div className="flex items-center mt-1 gap-1 md:gap-3">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="md:w-10 md:h-10 w-5 h-5 rounded-full"
          />
          <div>
            <p className="md:font-semibold font-medium text-sm">{post.user.name}</p>
            <span className="text-xs hidden md:block text-gray-500">{post.time}</span>
          </div>
        </div>
</div>
      

      {/* 🖼️ Swiper Gallery */}
      {post.gallery && post.gallery.length > 0 && (
        <div className="p-4 hidden md:block">
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
                  className="rounded-lg w-full h-24 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                  // ✅ Click করলে mainImage update হবে
                  onClick={() => setMainImage(img)}
                  // ✅ Optional: Hover করলে mainImage update
                  onMouseEnter={() => setMainImage(img)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* 📝 Description */}
      <div className=" mt-1">
        {post.text && (
          <div className="text-gray-700 text-sm font-medium leading-snug mb-2">
            {showFullText ? post.text : truncatedText}
            
          </div>
        )}
      </div>

      {/* ⚙️ Action Buttons (Hide on mobile) */}
      <div className="hidden sm:flex justify-around border-t p-2 text-lg text-gray-600">
        <Link to="/photo">
          <button className="flex items-center gap-1 hover:scale-110 hover:text-yellow-900 transition">
            <FaPhotoVideo /> Photo
          </button>
        </Link>

        <button className="flex items-center gap-1 hover:scale-110 hover:text-green-600 transition">
          <FaShoppingCart /> Order
        </button>

        <button className="flex items-center gap-1 hover:scale-110 hover:text-red-600 transition">
          <FaShareAlt /> Share
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
