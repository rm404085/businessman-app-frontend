import { useEffect, useState } from "react";

const Footer = () => {
  const menuItems = [
    "Home",
    "Manufacture",
    "Live",
    "Car",
    "Basket",
    "Photo",
    "Require",
    "Review",
    "Short",
    "Rent",
  ];

  const [showFooter, setShowFooter] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showFirstHalf, setShowFirstHalf] = useState(true);

  // Detect screen size (mobile or laptop)
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint এর নিচে হলে mobile
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
        if (isMobile) setShowFirstHalf(false); // mobile হলে last 5 দেখাবে
      } else {
        // উপরের দিকে scroll করলে
        setShowFooter(true);
        if (isMobile) setShowFirstHalf(true); // mobile হলে first 5 দেখাবে
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobile]);

  // Decide which items to show
  const visibleItems = isMobile
    ? showFirstHalf
      ? menuItems.slice(0, 5) // প্রথম 5
      : menuItems.slice(5, 10) // শেষ 5
    : menuItems; // laptop এ সব 10

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 bg-gray-100 shadow transition-transform duration-300 ${
        showFooter ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 py-4 flex justify-around">
        {visibleItems.map((item, idx) => (
          <button
            key={idx}
            className="text-gray-700 hover:text-blue-600 text-sm md:text-base"
          >
            {item}
          </button>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
