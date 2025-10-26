import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  IoChatbubbleEllipsesOutline,
  IoShareSocialOutline,
  IoThumbsUpSharp,
  IoEllipsisHorizontalOutline,
  IoArrowBack,
} from "react-icons/io5";
import {
  FaFacebookMessenger,
  FaPaperPlane,
  FaPhotoVideo,
} from "react-icons/fa";
import { BiPhotoAlbum, BiSolidDislike } from "react-icons/bi";
import CommentsModal from "@/components/modal/videoModal/CommentsModal";
import ShareModal from "@/components/modal/videoModal/ShareModal";
import PhotosModal from "@/components/modal/videoModal/PhotosModal";

const VideoDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [related, setRelated] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Modals and states
  const [showPhotos, setShowPhotos] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const photos = [
     "https://picsum.photos/id/1015/200/200",
    "https://picsum.photos/id/1025/200/200",
    "https://picsum.photos/id/1035/200/200",
    "https://picsum.photos/id/1045/200/200",
    "https://picsum.photos/id/1015/200/200",
    "https://picsum.photos/id/1025/200/200",
    "https://picsum.photos/id/1035/200/200"
  ];

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetch("/vedio.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((v) => v.id.toString() === id);
        setVideo(found);
        const others = data.filter((v) => v.id.toString() !== id);
        setRelated(others);
      });
  }, [id]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const players = document.querySelectorAll(".video-player");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const player = entry.target.querySelector("video");
          if (player) {
            if (entry.isIntersecting) player.play();
            else player.pause();
          }
        });
      },
      { threshold: 0.7 }
    );
    players.forEach((p) => observer.observe(p));
    return () => players.forEach((p) => observer.unobserve(p));
  }, [isMobile, related]);

  if (!video) return <div className="p-5 text-gray-500">Loading...</div>;

  // 🔹 Mobile Layout (Reels/Shorts Style)
  if (isMobile) {
    const allVideos = [video, ...related];

    return (
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black relative">
        {allVideos.map((v, i) => (
          <div
            key={v.id || i}
            className="video-player h-screen w-full snap-start flex flex-col items-center justify-center relative"
          >
            {/* 🔹 Profile & Title + Send Message Button (Responsive) */}
            <div className="absolute top-2 left-0 w-full flex items-center justify-between px-4 z-50">
              <div className="flex items-center gap-3 text-white">
                <button
                  className="text-white z-50 relative"
                  onClick={handleBack}
                >
                  <IoArrowBack />
                </button>
                <img
                  src={v.company?.avatar}
                  alt={v.company?.name}
                  className="w-10 h-10 rounded-full border-2 border-sky-900"
                />
                <h4 className="font-bold text-lg">{v.company?.name}</h4>
              </div>

              <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-2 py-2 rounded-full backdrop-blur-md transition-all duration-200">
                <FaFacebookMessenger className="text-2xl" />
                <span className="text-xs">Message</span>
              </button>
            </div>

            {/* 🔹 ReactPlayer wrapped in pointer-block div */}
            <div className="pointer-events-none w-full h-full">
              <ReactPlayer
                url={v.src}
                playing={false}
                muted
                loop
                controls={false}
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* 🔹 Bottom Info */}
            <div className="absolute bottom-2 left-2 text-white p-2 items-center gap-3 z-50">
              <h3 className="text-md font-semibold">{v.title}</h3>
              <p>{v.views}</p>
            </div>

            {/* 🔹 Right Buttons */}
            <div className="absolute right-4 bottom-20 flex flex-col items-center gap-5 text-white text-2xl z-50">
              <IoThumbsUpSharp className="cursor-pointer" />
              <BiPhotoAlbum
                className="cursor-pointer"
                onClick={() => setShowPhotos(true)}
              />
              <IoShareSocialOutline
                className="cursor-pointer"
                onClick={() => setShowShareModal(true)}

                
                
              />
              <IoChatbubbleEllipsesOutline
                className="cursor-pointer"
                onClick={() => setShowCommentModal(true)}
              />
            </div>
          </div>
        ))}

        {/* 🔹 Photos Modal */}
        {showPhotos && (
          <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center">
            <PhotosModal 
            setShowPhotos={setShowPhotos}
             photos={photos}
          startIndex={0}
            />
          </div>
        )}

        {/* 🔹 Comment Modal */}
        {showCommentModal && (
          <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center">
            <CommentsModal 

            setShowCommentModal={setShowCommentModal}
            
            />
          </div>
        )}

        {/* 🔹 Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center">
            <ShareModal 

            setShowShareModal={setShowShareModal}
            
            />
          </div>
        )}
      </div>
    );
  }

  // 💻 Desktop Layout
  return (
    <div className="mt-16 flex flex-col lg:flex-row gap-6 lg:p-4 mx-auto">
      {/* Left Side - Main Video */}
      <div className="flex-1 relative">
        <div className="absolute top-0 left-2 flex items-center gap-3 z-10">
          <img
            src={video.company?.avatar}
            alt={video.company?.name}
            className="w-12 h-12 rounded-full border-2 border-sky-900"
          />
          <div>
            <h4 className="font-bold text-lg">{video.company?.name}</h4>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg mt-12">
          <ReactPlayer url={video.src} controls width="100%" height="480px" />
        </div>

        <p className="text-gray-500 text-sm mt-4">
          {video.views} views • {video.uploaded}
        </p>

        <div className="flex items-center justify-between mt-4 pb-4 border-b">
          <div className="flex gap-2 flex-wrap">
            <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg">
              <IoThumbsUpSharp /> Like
            </button>
            <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg">
              <BiSolidDislike /> Dislike
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
            >
              <IoShareSocialOutline /> Share
            </button>
            <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg">
              <FaPaperPlane /> Send
            </button>
            <button
              onClick={() => setShowPhotos(!showPhotos)}
              className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
            >
              <FaPhotoVideo /> Photos
            </button>
            <button
              onClick={() => setShowCommentModal(true)}
              className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
            >
              <IoChatbubbleEllipsesOutline /> Comment
            </button>
            <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg">
              <IoEllipsisHorizontalOutline /> More
            </button>
          </div>
        </div>

        {showPhotos && (
          <div className="grid grid-cols-3 gap-2 my-4">
            {photos.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`photo-${idx}`}
                className="w-full h-32 object-cover rounded-lg shadow"
              />
            ))}
          </div>
        )}

        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <p className="text-gray-700">{video.description}</p>
        </div>
      </div>

      {/* Right Side - Related Videos */}
      <div className="lg:w-1/3">
        <h3 className="text-lg font-semibold mb-3">Related Videos</h3>
        <div className="space-y-3">
          {related.map((r) => (
            <div
              key={r.id}
              onClick={() => navigate(`/video/${r.id}`)}
              className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
            >
              <img
                src={r.thumbnail || "https://via.placeholder.com/160x90"}
                alt={r.title}
                className="w-40 h-24 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold text-sm line-clamp-2">{r.title}</h4>
                <p className="text-gray-500 text-xs mt-1">
                  {r.channelName || "Channel"}
                </p>
                <p className="text-gray-500 text-xs">{r.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
