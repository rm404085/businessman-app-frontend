import { useRef, useState } from "react";
import "../vedioCategory/ScrollBar.css";
import {
  FaAmbulance,
  FaTruckMoving,
  FaTruckPickup,
  FaBus,
  FaCarSide,
  FaShuttleVan,
  FaTaxi,
  FaBicycle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

/**
 * Props:
 *  - onSelect?: (categoryName: string) => void
 *  - initialActive?: string
 */
const carCategoryData = [
  { name: "Ambulance", icon: FaAmbulance },
  { name: "Covered Van", icon: FaTruckMoving },
  { name: "Mini Truck", icon: FaTruckPickup },
  { name: "Pickup Van", icon: FaTruckPickup },
  { name: "Bus", icon: FaBus },
  { name: "Battery Rickshaw", icon: FaBicycle },
  { name: "Easy Bike", icon: FaBicycle },
  { name: "CNG / Taxi Type", icon: FaTaxi },
  { name: "Microbus", icon: FaShuttleVan },
  { name: "Sedan / Private Car", icon: FaCarSide },
];

const CarCategory = ({ onSelect, initialActive = "All" }) => {
  const [active, setActive] = useState(initialActive);
  const [carDropDown, setCarDropdown] = useState(initialActive === "All" ? "" : initialActive);
  const scrollRef = useRef(null);
  const nativeSelectRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const handleSelect = (catName) => {
    setActive(catName);
    setCarDropdown(catName);
    if (typeof onSelect === "function") onSelect(catName);
  };

  const handleDropdownChange = (e) => {
    const selected = e.target.value;
    handleSelect(selected);
  };

  // open native select on mobile when pressing the "Select Car" button
  const openNativeSelect = () => {
    if (nativeSelectRef.current) {
      // try to open — some browsers block programmatic open, but this will focus it
      nativeSelectRef.current.focus();
      try {
        nativeSelectRef.current.click();
      } catch (e) {
        /* ignore */
      }
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row lg:gap-4 justify-center items-center">
      {/* Desktop Dropdown */}
      <div className="hidden lg:block lg:text-xl text-xs font-semibold mb-3 text-center md:text-left">
        <select
          value={carDropDown}
          onChange={handleDropdownChange}
          className="border p-2 rounded"
        >
          <option value="">Select car</option>
          {carCategoryData.map((div) => (
            <option key={div.name} value={div.name}>
              {div.name}
            </option>
          ))}
        </select>
      </div>

      {/* Scrollable Categories */}
      <div className="relative flex items-center lg:w-5/6 w-full border-y border-gray-200 bg-white py-3">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 h-full px-2 bg-gradient-to-r from-white to-transparent hidden md:flex items-center"
        >
          <IoChevronBack className="text-2xl text-gray-600 hover:text-black" />
        </button>

        {/* Scrollable Buttons */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide w-full px-8 scroll-smooth"
        >
          {carCategoryData.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition focus:outline-none ${
                  active === cat.name
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-blue-100 text-gray-700"
                }`}
                type="button"
              >
                <Icon className="text-lg" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 h-full px-2 bg-gradient-to-l from-white to-transparent hidden md:flex items-center"
        >
          <IoChevronForward className="text-2xl text-gray-600 hover:text-black" />
        </button>
      </div>

      {/* Mobile Button -> opens native select */}
      <div className="lg:hidden mt-4 w-full flex justify-center">
        <button
          onClick={openNativeSelect}
          className="border bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Select Car
        </button>

        {/* hidden native select used for mobile UX (also accessible) */}
        <select
          ref={nativeSelectRef}
          value={carDropDown}
          onChange={handleDropdownChange}
          className="sr-only" // screen-reader only, keeps it out of visual flow
          aria-hidden="false"
        >
          <option value="">Select Car</option>
          {carCategoryData.map((div) => (
            <option key={div.name} value={div.name}>
              {div.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CarCategory;
