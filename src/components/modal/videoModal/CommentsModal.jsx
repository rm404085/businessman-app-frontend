import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IoSend } from "react-icons/io5";

const CommentsModal = ({ setShowCommentModal }) => {
  const [comments, setComments] = useState([
    { id: 1, name: "Alex", text: "Wow! Amazing video 🔥" },
    { id: 2, name: "Sophia", text: "Love the editing 😍" },
    { id: 3, name: "Liam", text: "Very informative, thanks!" },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowCommentModal(false);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        { id: Date.now(), name: "You", text: newComment },
      ]);
      setNewComment("");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        onClick={handleBackgroundClick}
        className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white rounded-t-3xl shadow-2xl w-full md:w-[600px] h-[90vh] overflow-hidden flex flex-col"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowCommentModal(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ✕
          </button>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center pt-3 border-b pb-2">
            Comments ({comments.length})
          </h3>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-100 rounded-2xl px-3 py-2 flex flex-col"
              >
                <span className="text-sm font-semibold text-gray-800">
                  {comment.name}
                </span>
                <span className="text-sm text-gray-700">{comment.text}</span>
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="border-t bg-gray-50 p-3 flex items-center gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
            >
              <IoSend size={18} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommentsModal;
