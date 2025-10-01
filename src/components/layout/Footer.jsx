import { useEffect, useState } from "react";

import { Link } from "react-router";
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
        // নিচের দিকে scroll করলে
        setShowFooter(true);
        if (isMobile) setShowFirstHalf(false);
      } else {
        // উপরের দিকে scroll করলে
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
        <div className="mx-auto max-w-6xl px-6 py-4 flex justify-between gap-6">
          {visibleItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="flex flex-col items-center text-gray-700 hover:text-blue-600 text-xs font-medium"
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
      ) : (
        // Laptop View
        <div className="bg-white/90 backdrop-blur border-t border-gray-200">
          <div className="mx-auto  px-6 py-4 flex justify-center items-center flex-row gap-4 flex-wrap">
            {visibleItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="flex items-center gap-4 text-gray-700 hover:text-white hover:bg-blue-600 transition-colors text-sm md:text-base rounded-lg py-2 px-2"
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
