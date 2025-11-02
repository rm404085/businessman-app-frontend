// VideoMenuModal.jsx
import {
  IoChatbubbleEllipsesOutline,
  IoShareSocialOutline,
  IoCopyOutline,
  IoHome,
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { useNavigate } from "react-router";


const VideoMenuModal = ({ open, setOpen, setOpenPostReview }) => {
  const navigate = useNavigate();
  

  return (
    <div>
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-10"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu */}
            <motion.div
              className="fixed -top-5 right-0 w-64 bg-white rounded-b-2xl shadow-lg z-50 p-5"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                  }}
                  className="active:scale-95 transition text-gray-700 hover:text-red-500"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false)
                  setTimeout(() =>setOpenPostReview(true), 150); // wait for animation, then close parent
}}
                  className="flex items-center gap-3 py-2 hover:bg-gray-100 rounded-xl px-3 text-gray-700"
                >
                  <MdReviews size={24} />
                  <span>Special Review</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Send Message clicked");
                  }}
                  className="flex items-center gap-3 py-2 hover:bg-gray-100 rounded-xl px-3 text-gray-700"
                >
                  <IoChatbubbleEllipsesOutline size={22} />
                  <span>Send Message</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Share clicked");
                  }}
                  className="flex items-center gap-3 py-2 hover:bg-gray-100 rounded-xl px-3 text-gray-700"
                >
                  <IoShareSocialOutline size={22} />
                  <span>Share</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied!");
                  }}
                  className="flex items-center gap-3 py-2 hover:bg-gray-100 rounded-xl px-3 text-gray-700"
                >
                  <IoCopyOutline size={22} />
                  <span>Copy Link</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      
    </div>
  );
};

export default VideoMenuModal;
