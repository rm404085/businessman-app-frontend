import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

const PhotosModal = ({ setShowPhotos, photos = [], startIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowPhotos(false);
    }
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        onClick={handleBackgroundClick}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Main Modal */}
        <motion.div
          className="relative w-full md:w-[800px] h-[90vh] flex items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          {photos.length > 0 ? (
            <img
              src={photos[currentIndex]}
              alt={`Photo ${currentIndex + 1}`}
              className="w-full h-full object-contain rounded-xl"
            />
          ) : (
            <p className="text-white">No photos available</p>
          )}

          {/* Close Button */}
          <button
            onClick={() => setShowPhotos(false)}
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 transition"
          >
            <IoClose />
          </button>

          {/* Prev Button */}
          {photos.length > 1 && (
            <button
              onClick={prevPhoto}
              className="absolute left-4 text-white text-4xl hover:text-gray-300 transition"
            >
              <IoChevronBack />
            </button>
          )}

          {/* Next Button */}
          {photos.length > 1 && (
            <button
              onClick={nextPhoto}
              className="absolute right-4 text-white text-4xl hover:text-gray-300 transition"
            >
              <IoChevronForward />
            </button>
          )}

          {/* Counter */}
          {photos.length > 0 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
              {currentIndex + 1} / {photos.length}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotosModal;
