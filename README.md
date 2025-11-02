# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



## PhotosCard
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
  const [mainImage, setMainImage] = useState(post.image); // ✅ main photo state

  const toggleText = () => setShowFullText(!showFullText);

  // ✂️ Text truncate logic
  const truncatedText =
    post.text && post.text.length > 100
      ? post.text.slice(0, 100) + "..."
      : post.text;

  return (
    <div className="bg-white rounded-xl m-1 p-1 shadow hover:shadow-lg transition overflow-hidden">
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
              <span className="text-xs flex justify-center items-center text-gray-500">{post.time}</span>
              
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

        {/* Text Section */}
        <div className="flex h-10 justify-between">
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
        </div>
      </div>

      {/* Main Image */}
      <img
        src={mainImage} // ✅ mainImage state ব্যবহার
        alt={post.text}
        className="w-full h-[350px] object-cover rounded-md"
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

      {/* Action Buttons */}
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

## Short card
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

const ShortCard = ({ short }) => {
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const videoRef = useRef(null);

  // 🧠 Intersection Observer: Auto play/pause when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.7 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  // ✂️ Text truncate logic
  const truncatedText =
    short.description && short.description.length > 100
      ? short.description.slice(0, 100) + "..."
      : short.description;

  return (
    <div ref={videoRef} className="hover:bg-violet-200 rounded-md p-2">
      <a href="#" className="group block">
        <div
          className="relative md:h-[450px] h-screen overflow-hidden rounded-md"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* 📸 Static thumbnail (before hover) */}
          <img
            src="https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition duration-300"
          />

          {/* 🎥 Video player */}
          <ReactPlayer
            url={short.src}
            playing={isVisible && playing}
            loop
            muted={!hovered}
            controls={hovered}
            width="100%"
            height="100%"
            className="pointer-events-auto cursor-pointer"
            onClick={() => setPlaying(!playing)}
          />

          {/* 🏷️ Company Name Overlay */}
          <div className="absolute top-3 left-3 text-white px-3 py-1 rounded-md text-sm font-semibold backdrop-blur-sm">
            {short.company.name || "Company Name"}
          </div>
        </div>

        {/* 📄 Description */}
        <div className="mt-3">
          <p className="mt-1.5 text-xs text-pretty text-gray-500">
            {short.description && (
              <div className="text-gray-700 text-sm font-medium leading-snug mb-2">
                {showFullText ? short.description : truncatedText}
              </div>
            )}
          </p>
        </div>
      </a>
    </div>
  );
};

export default ShortCard;




