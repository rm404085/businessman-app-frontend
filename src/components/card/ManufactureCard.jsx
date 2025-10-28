import { IoMagnetSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";



const ManufactureCard = ({ video }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("video");
  const [comments, setComments] = useState(video.comments || []);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  // Media arrays
  const videoSrcs = Array.isArray(video.media?.video)
    ? video.media.video
    : video.media?.video
    ? [video.media.video]
    : [];
  const photos = video.media?.photos || [];
  const currentArr = activeTab === "photos" ? photos : videoSrcs;
  const currentSrc =
    currentArr.length > 0 ? currentArr[currentIndex % currentArr.length] : null;

  // Initial tab selection
  useEffect(() => {
    if (videoSrcs.length > 0) setActiveTab("video");
    else if (photos.length > 0) setActiveTab("photos");
    else setActiveTab("comments");
  }, [videoSrcs.length, photos.length]);

  

  // Card click navigation
  const handleCardClick = () => {
    navigate(`/video/${video.id}`);
  };

  // Prev / Next media
  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % currentArr.length);
  };
  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? currentArr.length - 1 : prev - 1));
  };

  // Add comment
  const handleAddComment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!newComment.trim()) return;
    setComments([...comments, { user: "Anonymous", text: newComment }]);
    setNewComment("");
  };

  // Tab change
  const handleTabChange = (e, tab) => {
    e.stopPropagation();
    setActiveTab(tab);
  };

  const shortText = video.title?.slice(0, 100) || "";

  return (
    <div className="rounded-xl hover:bg-violet-100 transition bg-white flex flex-col cursor-pointer">
      {/* Top Section */}
      <div className="p-3 space-y-2">
        {/* Company Info */}
        <div className="flex items-center justify-between gap-2">
          <img
            src={video.company?.avatar}
            alt={video.company?.name}
            className="w-10 h-10 rounded-full border-2 border-sky-900 cursor-pointer hover:scale-110"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex-1 px-3">
            <h4
              className="font-extrabold hover:text-violet-900 text-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {video.company?.name}
            </h4>
            <p className="text-xs text-gray-500">{video.company.tagline}</p>
          </div>
          <button
            className="p-2 rounded-full border-2 border-blue-900 shadow-md hover:shadow-lg cursor-pointer transform transition-all hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              alert("Magnet clicked!");
            }}
          >
            <IoMagnetSharp className="text-2xl" />
          </button>
        </div>

        {/* Title */}
        <div className="mt-2 text-sm flex text-gray-700">
          <p className="flex-1">
            {expanded
              ? video.title
              : shortText + (video.title?.length > 100 ? "..." : "")}
          </p>
          {video.title?.length > 100 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="text-blue-600 font-light ml-1"
            >
              {expanded ? "Show less" : "More"}
            </button>
          )}
        </div>

        {/* Views + Uploaded */}
        <div className="text-gray-500 text-xs flex justify-between">
          <span>{video.views} views</span>
          <span>{video.uploaded}</span>
        </div>
      </div>

      {/* Media / Comments */}
      <div className="relative w-full min-h-[350px]">
        {/* Video */}
        {activeTab === "video" && videoSrcs.length > 0 && currentSrc && (
          <>
            <ReactPlayer
              url={currentSrc}
              playing
              muted
              loop
              controls
              width="100%"
              height="300px"
              style={{ pointerEvents: "none" }} // overlay will handle click
              config={{ file: { attributes: { playsInline: true } } }}
            />
            <button
              onClick={handleCardClick}
              className="absolute inset-0 w-full h-full bg-transparent"
              aria-label="Open video details"
            />
          </>
        )}

        {/* Photos */}
        {activeTab === "photos" && photos.length > 0 && (
          <>
            <img
              src={currentSrc}
              alt="media"
              className="w-full h-[350px] object-cover"
            />
            <button
              onClick={handleCardClick}
              className="absolute inset-0 w-full h-full bg-transparent"
              aria-label="Open photo details"
            />
          </>
        )}

       {activeTab === "comments" && (
  <div
    className="p-4 flex flex-col justify-between h-[300px]" // important part
    onClick={(e) => e.stopPropagation()}
  >
    <div className="flex flex-col gap-2 overflow-y-auto">
      {comments.length === 0 && (
        <p className="text-gray-500">No comments yet.</p>
      )}
      {comments.map((c, idx) => (
        <div key={idx} className="border-b border-gray-200 pb-1">
          <p className="font-semibold">{c.user}</p>
          <p className="text-gray-700">{c.text}</p>
        </div>
      ))}
    </div>

    {/* Input fixed at bottom */}
    <form onSubmit={handleAddComment} className="mt-2 flex gap-2">
      <input
        type="text"
        placeholder="Add a comment..."
        className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        Post
      </button>
    </form>
  </div>
)}


        {/* Prev/Next Buttons */}
        {currentArr.length > 1 && (activeTab === "video" || activeTab === "photos") && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 px-2 py-1 rounded-full text-lg"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 px-2 py-1 rounded-full text-lg"
            >
              ›
            </button>
          </>
        )}

        {/* Tabs */}
        <div
          className="flex h-6 absolute bottom-3 -translate-x-1/2 left-1/2 gap-6 py-1 bg-black/35 px-4 rounded-full text-xs backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {videoSrcs.length > 0 && (
            <button
              onClick={(e) => handleTabChange(e, "video")}
              className={`px-2 py-0 flex gap-1 justify-center rounded-sm ${
                activeTab === "video" ? "bg-white text-black" : "text-white"
              }`}
            >
              Video
            </button>
          )}
          {photos.length > 0 && (
            <button
              onClick={(e) => handleTabChange(e, "photos")}
              className={`px-1 w-20 py-0 flex gap-1 justify-center rounded-sm ${
                activeTab === "photos" ? "bg-white text-black" : "text-white"
              }`}
            >
              <span>Photos</span>
              <span>
                {photos.length > 0 ? `${currentIndex + 1}/${photos.length}` : "0/0"}
              </span>
            </button>
          )}
          <button
            onClick={(e) => handleTabChange(e, "comments")}
            className={`px-2 py-0 flex gap-1 justify-center rounded-sm ${
              activeTab === "comments" ? "bg-white text-black" : "text-white"
            }`}
          >
            <span>Comments</span>
            <span>({comments.length})</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert("Message clicked!");
            }}
            className="text-white"
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManufactureCard;
