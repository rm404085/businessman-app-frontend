import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router"; // ✅ useLocation import
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
    { name: "Basket", path: "/basket", icon: <IoBasket /> },
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

  const location = useLocation(); // ✅ current path পাওয়ার জন্য

  // Detect screen size (mobile or laptop)
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
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
    <footer
      className={`fixed bottom-2 left-0 right-0 shadow-md transition-transform duration-300 ${
        showFooter ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {isMobile ? (
        //  Mobile View
        <div className="mx-auto max-w-6xl px-6 py-4 flex justify-between gap-6 bg-white/90 backdrop-blur border-t border-gray-200">
          {visibleItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={idx}
                to={item.path}
                className={`flex flex-col items-center text-xs font-medium transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <span className={`text-lg ${isActive ? "text-blue-600" : ""}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </div>
      ) : (
        // Laptop View
        <div className="bg-white/90  backdrop-blur border-t border-gray-200">
          <div className="mx-auto w-full px-6 py-4 flex justify-between items-center gap-4">
            {visibleItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm md:text-base rounded-xl py-2 px-3 transition ${
                    isActive
                  ? "bg-gradient-to-r from-purple-600 to-violet-900 text-white shadow-md shadow-purple-800 scale-105 border  border-b-4  border-r-4 border-t-0 bg-clip-padding"
      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
