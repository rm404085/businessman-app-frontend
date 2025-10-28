import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ChevronDown } from "lucide-react";

import "./PhotoScrollBar.css";
import PhotoModal from "@/components/modal/photoModal/photoModal";

const PhotoCategory = () => {
  const [active, setActive] = useState("All");
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { name: "All", path: "/photo" },
    { name: "Nature", path: "/photo/nature" },
    { name: "Travel", path: "/photo/travel" },
    { name: "People", path: "/photo/people" },
    { name: "Architecture", path: "/photo/architecture" },
    { name: "Food", path: "/photo/food" },
    { name: "Animals", path: "/photo/animals" },
    { name: "Sports", path: "/photo/sports" },
    { name: "Fashion", path: "/photo/fashion" },
    { name: "Technology", path: "/photo/technology" },
    { name: "Art", path: "/photo/art" },
    { name: "Event", path: "/photo/event" },
    { name: "Landscape", path: "/photo/landscape" },
    { name: "Night", path: "/photo/night" },
    { name: "Macro", path: "/photo/macro" },
    { name: "Product", path: "/photo/product" },
  ];

  // ✅ Detect current category from URL
  useEffect(() => {
    const currentCat =
      categories.find((cat) => location.pathname === cat.path) || categories[0];
    setActive(currentCat.name);
  }, [location.pathname]);

  // ✅ Category select
  const handleCategoryClick = (cat) => {
    setActive(cat.name);
    setOpen(false);
    // navigate(cat.path);
  };

  // ✅ Prevent scroll when modal open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
   <div className="relative">
     <div className="z-30 bg-white flex items-center justify-between border-b border-gray-200 relative">
      {/* Horizontal Scroll Categories */}
      <div
        ref={scrollRef}
        className="flex gap-3 md:gap-6 overflow-x-auto photo-scrollbar-hide px-3 md:py-4 py-2 scroll-smooth w-full"
      >
        {categories.map((cat, idx) => (
          <div
            key={idx}
            to={cat.path}
            onClick={() => setActive(cat.name)}
            className={`whitespace-nowrap text-[13px] md:text-lg font-medium transition pb-1 ${
              active === cat.name
                ? "text-violet-700 border-b-2 border-violet-700"
                : "text-gray-600 hover:text-violet-700"
            }`}
          >
            {cat.name}
          </div>
        ))}
        
      </div>
      <div>
           {/* Right Side Dropdown Button */}
    
        <button
        className="dropdown-btn flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-violet-700"
        onClick={() => setOpen(true)}
      >
        <ChevronDown className="w-5 h-5" />
      </button>
        </div>

      
    </div>
   

      {/* Modal */}
      <div>
        {open && (
        <PhotoModal
          handleCategoryClick={handleCategoryClick}
          setOpen={setOpen}
          categories={categories}
          active={active}
          open={open}
        />
      )}
      </div>
    
   </div>
  );
};

export default PhotoCategory;
