import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion"; // ✅ Animation import
import {
  IoHome,
  IoBuild,
  IoVideocam,
  IoCar,
  IoBasket,
  IoCamera,
  IoDocumentText,
  IoChatbubbles,
  IoPlayCircle,
  IoKey,
} from "react-icons/io5";

const Footer = () => {
  
  const menuItems = [
    { name: "Home", path: "/", icon: <IoHome /> },
    { name: "Manufacture", path: "/manufacture", icon: <IoBuild /> },
    { name: "Live", path: "/live", icon: <IoVideocam /> },
    { name: "Car", path: "/car", icon: <IoCar /> },
    { name: "Market", path: "/market", icon: <IoBasket /> },
    { name: "Photo", path: "/photo", icon: <IoCamera /> },
    { name: "Require", path: "/require", icon: <IoDocumentText /> },
    { name: "Review", path: "/review", icon: <IoChatbubbles /> },
    { name: "Short", path: "/short", icon: <IoPlayCircle /> },
    { name: "Rent", path: "/rent", icon: <IoKey /> },
    
  ];

  const [showFooter, setShowFooter] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showFirstHalf, setShowFirstHalf] = useState(true);
  const location = useLocation();

  

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowFooter(true);
        if (isMobile) setShowFirstHalf(false);
      } else {
        setShowFooter(true);
        if (isMobile) setShowFirstHalf(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobile]);

  // Decide which items to show
  const visibleItems = isMobile
    ? showFirstHalf
      ? menuItems.slice(0, 5)
      : menuItems.slice(5, 10)
    : menuItems;

  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: showFooter ? 0 : 100 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-2 left-0 right-0 z-50"
    >
      {isMobile ? (
        // 🌐 Mobile View
        <div className="mx-auto max-w-6xl px-6  flex justify-between gap-6  bottom-0  border-gray-200  ">
          {visibleItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={item.path}
                  className={`flex flex-col items-center text-xs font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  <motion.span
                    className={`text-lg ${
                      isActive ? "text-blue-600" : ""
                    }`}
                    whileHover={{ rotate: 10 }}
                  >
                    {item.icon}
                  </motion.span>
                  {item.name}
                </Link>
              </motion.div>
            );
          })}
        </div>
      ) : (
        // 💻 Laptop View
        <div className=" bottom-0 border-t ">
          <div className="mx-auto w-full px-6  flex justify-between items-center gap-4">
            {visibleItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 text-sm md:text-base rounded-xl py-2 px-3 transition-all duration-300 
                      ${
                        isActive
                          ?" text-violet-700 bg-gray-100"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                      }`}
                  >
                    <motion.span
                      className={`text-lg ${
                        isActive
                          ? "scale-125 text-yellow-300 drop-shadow-md"
                          : ""
                      }`}
                      whileHover={{ rotate: 8 }}
                    >
                      {item.icon}
                    </motion.span>
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </motion.footer>
  );
};

export default Footer;
