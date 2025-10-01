import { useState } from "react";
import { FaUserCircle, FaHeart, FaShare, FaGift } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const Live = () => {
  const [comments, setComments] = useState([
    { user: "Rahim", text: "Wow! Awesome live 🔥" },
    { user: "Karim", text: "Love from Dhaka ❤️" },
    { user: "Nusrat", text: "Nice product, how much?" },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleSend = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { user: "You", text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-y-auto my-20 bg-black text-white">
      {/* Video Section */}
      <div className="relative bg-black w-full md:flex-1 md:h-screen h-[70vh]">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          src="https://www.w3schools.com/html/mov_bbb.mp4"
        />

        {/* Top Overlay */}
        <div className="absolute top-0 left-0 w-full flex justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-3xl" />
            <div>
              <h4 className="font-semibold">Manufacturer Live</h4>
              <p className="text-xs text-gray-300">2.3k watching</p>
            </div>
          </div>
          <span className="bg-red-600 text-xs px-3 py-1 rounded-full animate-pulse">
            🔴 LIVE
          </span>
        </div>

        {/* Bottom Actions (Mobile Only) */}
        <div className="absolute bottom-16 w-full flex justify-around items-center bg-gradient-to-t from-black/40 to-transparent p-3 md:hidden">
          <button className="text-xl"><FaHeart /></button>
          <button className="text-xl"><FaGift /></button>
          <button className="text-xl"><FaShare /></button>
        </div>
      </div>

      {/* Chat & Interaction Panel */}
      <div className="w-full md:w-80 bg-gray-900 border-l border-gray-800 flex flex-col md:h-screen h-[30vh]">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {comments.map((c, i) => (
            <div key={i} className="text-sm">
              <span className="font-semibold">{c.user}: </span>
              <span className="text-gray-300">{c.text}</span>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-3 border-t border-gray-800 flex gap-2 bg-gray-900">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <IoIosSend className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Live;
