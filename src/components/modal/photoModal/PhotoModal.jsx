import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const PhotoModal = ({ setOpen, handleCategoryClick, categories, active }) => {
  return createPortal(
    <AnimatePresence>
      <>
        {/* Overlay */}
        <motion.div
          className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        />

        {/* Bottom Sheet Modal */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 w-full bg-white rounded-t-3xl shadow-2xl z-[1000] flex flex-col"
          style={{ height: "80vh" }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-base font-semibold">Select Category</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Categories */}
          <div className="flex-1 overflow-y-auto">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => handleCategoryClick(cat)}
                className={`px-5 py-3 cursor-pointer border-b hover:bg-violet-50 ${
                  active === cat.name ? "text-violet-700 font-semibold" : "text-gray-700"
                }`}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </motion.div>
      </>
    </AnimatePresence>,
    document.body
  );
};

export default PhotoModal;
