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
