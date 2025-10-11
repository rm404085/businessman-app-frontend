// src/page/notFound/NotFound.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[85vh] text-center bg-gradient-to-br from-violet-950 via-purple-800 to-black text-white px-4">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
        className="mb-6 text-yellow-400"
      >
        <FaExclamationTriangle className="text-6xl drop-shadow-lg" />
      </motion.div>

      {/* Text */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-7xl font-extrabold mb-3"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-gray-300 max-w-md mb-8"
      >
        Oops! The page you are looking for doesn’t exist or has been moved.
      </motion.p>

      {/* Button */}
      <motion.button
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-full font-semibold shadow-lg"
      >
        <FaHome className="text-white" />
        Go Back Home
      </motion.button>
    </div>
  );
};

export default NotFound;
