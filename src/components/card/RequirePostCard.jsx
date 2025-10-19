import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";

const RequirePostCard = ({ post }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos = post.media.filter((m) => !m.includes(".mp4"));
  const videos = post.media.filter((m) => m.includes(".mp4"));

  const defaultTab =
    photos.length > 0 ? "Photo" : videos.length > 0 ? "Videos" : "Comments";

  const [activeTab, setActiveTab] = useState(defaultTab);

  const [comments, setComments] = useState([
    { user: "User 1", text: "Great post! Thanks for sharing." },
    { user: "User 2", text: "Awesome content!" },
    { user: "User 3", text: "Very informative." },
    { user: "User 4", text: "Nice post!" },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleNext = () => {
    const arr = activeTab === "Photo" ? photos : videos;
    setCurrentIndex((prev) => (prev + 1) % arr.length);
  };

  const handlePrev = () => {
    const arr = activeTab === "Photo" ? photos : videos;
    setCurrentIndex((prev) => (prev === 0 ? arr.length - 1 : prev - 1));
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    setComments([...comments, { user: "You", text: newComment }]);
    setNewComment("");
  };

  const currentSrc =
    activeTab === "Photo"
      ? photos[currentIndex % photos.length]
      : videos[currentIndex % videos.length];

  const isVideo = currentSrc?.includes(".mp4");

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-tr ${post.profileColor} flex items-center justify-center font-bold text-lg`}
          >
            {post.user ? post.user.charAt(0) : "U"}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{post.user}</h3>
            <p className="text-xs text-gray-500">{post.time}</p>
          </div>
        </div>
      <div className="flex justify-center">
          <button type="button" className="bg-slate-200 px-4 mr-4 rounded-full">Inbox</button>
        <IoEllipsisVertical className="text-gray-500 text-xl cursor-pointer hover:text-gray-700" />
      </div>
      </div>
      <hr />

      {/* Content */}
      <div className="relative w-full min-h-[400px]">
        {activeTab === "Photo" && photos.length > 0 && (
          <img
            src={currentSrc}
            alt={`media-${currentIndex}`}
            className="w-full h-[350px] object-cover"
          />
        )}
        {activeTab === "Videos" && videos.length > 0 && (
          <video
            src={currentSrc}
            controls
            className="w-full h-[300px] object-cover"
          />
        )}
        {activeTab === "Comments" && (
          <div className="flex flex-col max-h-[350px] px-4 py-2">
            <div className="flex-1 overflow-y-auto mb-2">
              {comments.map((c, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3  border-b border-gray-100 mt-8"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    {c.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {c.user}
                    </p>
                    <p className="text-gray-600 text-sm">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Field */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 border  rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              />
              <button
                onClick={handleAddComment}
                className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-600"
              >
                Post
              </button>
            </div>
          </div>
        )}
        {activeTab === "Details" && (
          <div className="p-4 text-gray-800 text-sm md:text-base">
            {post.text || "No details available."}
          </div>
        )}

        {/* Nav Arrows (Photo/Video only) */}
        {(activeTab === "Photo" ? photos : videos).length > 1 &&
          (activeTab === "Photo" || activeTab === "Videos") && (
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
      </div>

      {/* Tabs Overlay (Always Visible) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 bg-black/50 px-2 py-2 rounded-full text-xs text-white backdrop-blur-sm">
        <button
          onClick={() => {
            setActiveTab("Photo");
            setCurrentIndex(0);
          }}
          className={`px-2 py-0 flex gap-1 justify-center rounded-sm ${
            activeTab === "Photo" ? "bg-white text-black" : ""
          }`}
        >
          <span>Photo</span>
          <span>
            {photos.length > 0 ? `${currentIndex + 1}/${photos.length}` : "0/0"}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("Comments")}
          className={`px-2 py-0 flex gap-1 justify-center rounded-sm ${
            activeTab === "Comments" ? "bg-white text-black" : ""
          }`}
        >
          <span>Comments</span>
          <span>{comments.length}</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("Videos");
            setCurrentIndex(0);
          }}
          className={`px-2 py-0 flex gap-1 justify-center rounded-sm ${
            activeTab === "Videos" ? "bg-white text-black" : ""
          }`}
        >
          <span>Videos</span>
          <span>{videos.length}</span>
        </button>
        <button
          onClick={() => setActiveTab("Details")}
          className={`px-2 py-0 flex gap-1 justify-center rounded-sm ${
            activeTab === "Details" ? "bg-white text-black" : ""
          }`}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default RequirePostCard;
