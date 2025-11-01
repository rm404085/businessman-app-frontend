import { IoChatbubbleEllipsesOutline, IoShareSocialOutline, IoCopyOutline, IoHome } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { FaCross, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";

const PhotoMenuModal = ({open , setOpen}) => {

  const navigate = useNavigate();

    return(
        <div>
{/* Overlay (black transparent background) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Bottom Sheet Menu */}
            <motion.div
              className="fixed top-o right-0 w-64 bg-white rounded-b-2xl shadow-lg z-50 p-5"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
            >
             <div className="flex justify-end">
  <button
    onClick={() => setOpen(false)}
    className="active:scale-95 transition text-gray-700 hover:text-red-500"
  >
    <FaTimes className="text-xl" />
  </button>
</div>
              <div className="flex flex-col gap-3">
                <button 
                onClick={()=>navigate("/")}
                className="flex items-center gap-3 py-2 hover:bg-gray-100 rounded-xl px-3 text-gray-700">
                  <IoHome size={22}></IoHome>
                  <span>Home</span>

                </button>
                <button className="flex items-center gap-3 py-2 hover:bg-gray-100 rounded-xl px-3 text-gray-700">
                  <IoChatbubbleEllipsesOutline size={22} />
                  <span>Send Message</span>
                </button>

                <button className="flex items-center gap-3 py-2 hover:bg-gray-100 rounded-xl px-3 text-gray-700">
                  <IoShareSocialOutline size={22} />
                  <span>Share</span>
                </button>

                <button className="flex items-center gap-3 py-2 hover:bg-gray-100 rounded-xl px-3 text-gray-700">
                  <IoCopyOutline size={22} />
                  <span>Copy Link</span>
                </button>
              </div>

              {/* Cancel button */}
              
            </motion.div>
          </>
        )}
      </AnimatePresence>
        </div>
    )
}

export default PhotoMenuModal;