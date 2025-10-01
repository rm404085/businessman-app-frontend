import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router"; 
import "../vedioCategory/Scrollbar.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const VedioCategory = () => {
  const [active, setActive] = useState("All");
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    { name: "All", path: "/" },
    { name: "Shirt", path: "/category/shirt" },
    { name: "Pant", path: "/category/pant" },
    { name: "Shoe", path: "/category/shoe" },
    { name: "Watch", path: "/category/watch" },
    { name: "Bag", path: "/category/bag" },
    { name: "Sunglass", path: "/category/sunglass" },
    { name: "Cap", path: "/category/cap" },
    { name: "Mobile", path: "/category/mobile" },
    { name: "Laptop", path: "/category/laptop" },
    { name: "Headphone", path: "/category/headphone" },
    { name: "Perfume", path: "/category/perfume" },
    { name: "Cosmetics", path: "/category/cosmetics" },
    { name: "Jewelry", path: "/category/jewelry" },
    { name: "Home Appliances", path: "/category/home-appliances" },
    { name: "Kitchen Tools", path: "/category/kitchen-tools" },
    { name: "Furniture", path: "/category/furniture" },
    { name: "Book", path: "/category/book" },
    { name: "Sports Item", path: "/category/sports" },
    { name: "Toy", path: "/category/toy" },
    { name: "Gift", path: "/category/gift" },
    { name: "Lock & Key", path: "/category/lock-key" },
    { name: "Camera", path: "/category/camera" },
    { name: "Accessories", path: "/category/accessories" },
    { name: "Others", path: "/category/others" },
  ];

  // Scroll function
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="z-40 bg-white flex items-center border-y border-gray-200 relative">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 z-10 h-full px-2 bg-gradient-to-r from-white to-transparent"
      >
        <IoChevronBack className="text-2xl text-gray-600 md:block hidden hover:text-black" />
      </button>

      {/* Scrollable Categories */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-8 py-2 scroll-smooth"
      >
        {categories.slice().reverse().map((cat, idx) => (
          <Link
            key={idx}
            to={cat.path} // ✅ Path দেওয়া হলো
            onClick={() => setActive(cat.name)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition ${
              active === cat.name
                ? "bg-primary-foreground"
                : "bg-gray-100  hover:bg-violet-700"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 z-10 h-full px-2 bg-gradient-to-l from-white to-transparent"
      >
        <IoChevronForward className="text-2xl hidden md:block text-gray-600 hover:text-black" />
      </button>
    </div>
  );
};

export default VedioCategory;
