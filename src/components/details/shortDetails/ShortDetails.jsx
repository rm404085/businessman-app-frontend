import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Heart, Share2, MessageCircle } from "lucide-react";
import { IoChevronBackOutline } from "react-icons/io5";
import ShareModal from "@/components/modal/videoModal/ShareModal";
import { FaComment } from "react-icons/fa";
import CommentsModal from "@/components/modal/videoModal/CommentsModal";

const ShortDetails = () => {
  const { id } = useParams();
  const [shortData, setShortData] = useState(null);
  const [related, setRelated] = useState([]);
  const [liked, setLiked] = useState(false);
  const [showRelated, setShowRelated] = useState(false);
  const [showShareModal,setShowShareModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false)
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // 🔹 Load current short + related
  useEffect(() => {
    fetch("/shorts.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((s) => s.id.toString() === id);
        setShortData(found);
        const others = data.filter((s) => s.id.toString() !== id);
        setRelated(others);
      });
  }, [id]);

  // 🔹 Auto play/pause when scrolling
  useEffect(() => {
    if (!containerRef.current) return;
    const videos = containerRef.current.querySelectorAll(".video-wrapper");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector("video");
          if (video) {
            if (entry.isIntersecting) video.play();
            else video.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    videos.forEach((v) => observer.observe(v));
    return () => videos.forEach((v) => observer.unobserve(v));
  }, [shortData, related]);

  // 🔹 Loading state
  if (!shortData)
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading...
      </div>
    );

  const allVideos = [shortData, ...related];

  return (
    <div
      key={id} // ✅ route বদলালে force re-mount
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black text-white"
    >
      {allVideos.map((video) => (
        <div
          key={video.id}
          className="video-wrapper relative w-full h-screen snap-start flex flex-col justify-between"
        >
          {/* 🔹 Background video */}
          <video
            src={video.src}
            muted
            loop
            playsInline
            autoPlay
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          {/* 🔹 Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* 🔹 Top section (Back + Profile + Similar) */}
          <div className="absolute top-6 left-4 right-4 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="text-2xl text-white/80"
              >
                <IoChevronBackOutline />
              </button>

              <img
                src={video.company?.avatar || video.company?.logo || "https://i.pravatar.cc/40"}
                alt="profile"
                className="w-10 h-10 rounded-full border border-white/50 object-cover"
              />

              <div>
                <p className="font-semibold">
                  {video.company?.name || "User Name"}
                </p>
                <p className="text-xs text-gray-300">
                  @{video.company?.username || "username"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowRelated((prev) => !prev)}
              className="bg-white/20 hover:bg-white/40 transition-all duration-200 text-white px-3 py-1 rounded-full text-sm"
            >
              Similar
            </button>
          </div>

          {/* 🔹 Right side icons */}
          <div className="absolute right-4 bottom-36 flex flex-col items-center gap-6 z-20">
            <button
              onClick={() => setLiked((prev) => !prev)}
              className={`transition-transform hover:scale-110 ${
                liked ? "text-red-500" : "text-white"
              }`}
            >
              <Heart size={28} fill={liked ? "red" : "none"} />
            </button>

            <button onClick={()=>setShowCommentModal(true)}>
              <FaComment size={28}></FaComment>
            </button>

            <button onClick={()=> setShowShareModal(true)}>
              <Share2 size={28} />
            </button>
          </div>

          {
            showShareModal && (
                <div>
                    <ShareModal setShowShareModal={setShowShareModal}></ShareModal>
                </div>
            )
          }

          {
            showCommentModal && (
                <div>
                    <CommentsModal setShowCommentModal={setShowCommentModal}></CommentsModal>
                </div>
            )
          }


          {/* 🔹 Bottom caption + message */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <p className="text-sm mb-3">{video.description}</p>

            <div className="flex items-center bg-white/10 rounded-full px-3 py-2">
              <input
                type="text"
                placeholder="Message..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-300"
              />
              <button className="text-violet-400 font-semibold ml-2 text-sm">
                Send
              </button>
            </div>
          </div>

          {/* 🔹 Related video thumbnails */}
          {showRelated && related.length > 0 && (
            <div className="absolute bottom-24 left-0 right-0 p-4 flex gap-3 overflow-x-auto z-30 bg-black/70 rounded-t-xl">
              {related.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    setShowRelated(false);
                    navigate(`/short/${s.id}`);
                  }}
                  className="min-w-[120px] cursor-pointer"
                >
                  <img
                    src={s.photos}
                    alt={s.description}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <p className="text-xs mt-1 truncate">{s.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShortDetails;
