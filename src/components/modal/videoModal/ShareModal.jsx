import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebookMessenger,
  FaWhatsapp,
  FaTwitter,
  FaLink,
  FaFacebook,
} from "react-icons/fa";

const ShareModal = ({ setShowShareModal }) => {
  const shareOptions = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-blue-600" />,
      action: () => window.open("https://facebook.com", "_blank"),
    },
    {
      name: "Messenger",
      icon: <FaFacebookMessenger className="text-sky-500" />,
      action: () => window.open("https://messenger.com", "_blank"),
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-green-500" />,
      action: () =>
        window.open("https://wa.me/?text=Check+this+video", "_blank"),
    },
    {
      name: "Twitter / X",
      icon: <FaTwitter className="text-blue-400" />,
      action: () =>
        window.open(
          "https://twitter.com/intent/tweet?text=Check+this+video",
          "_blank"
        ),
    },
    {
      name: "Copy Link",
      icon: <FaLink className="text-gray-600" />,
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        alert("✅ Link copied to clipboard!");
      },
    },
  ];

  // Background click handler
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowShareModal(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        id="modalBackground"
        onClick={handleBackgroundClick}
        className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white rounded-t-3xl shadow-2xl p-6 w-full md:w-[600px] h-[50vh] md:h-[60vh] overflow-y-auto"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowShareModal(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ✕
          </button>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Share to
          </h3>

          {/* Share Options */}
          <div className="grid grid-cols-3 gap-4 justify-center mt-4">
            {shareOptions.map((opt, idx) => (
              <motion.button
                key={idx}
                onClick={opt.action}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center justify-center gap-2 hover:bg-gray-100 rounded-xl p-3 transition-all duration-200"
              >
                <div className="text-3xl">{opt.icon}</div>
                <span className="text-xs font-medium text-gray-700">
                  {opt.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShareModal;
