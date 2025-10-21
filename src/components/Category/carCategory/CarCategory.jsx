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

const carCategoryData = [
  { name: "Ambulance", path: "/car/ambulance", icon: FaAmbulance },
  { name: "Covered Van", path: "/car/covered-van", icon: FaTruckMoving },
  { name: "Mini Truck", path: "/car/mini-truck", icon: FaTruckPickup },
  { name: "Pickup Van", path: "/car/pickup-van", icon: FaTruckPickup },
  { name: "Bus", path: "/car/bus", icon: FaBus },
  { name: "Battery Rickshaw", path: "/car/battery-rickshaw", icon: FaBicycle },
  { name: "Easy Bike", path: "/car/easy-bike", icon: FaBicycle },
  { name: "CNG / Taxi Type", path: "/car/cng", icon: FaTaxi },
  { name: "Microbus", path: "/car/microbus", icon: FaShuttleVan },
  { name: "Sedan / Private Car", path: "/car/sedan", icon: FaCarSide },
];

const CarCategory = () => {
  const [active, setActive] = useState("All");
  const [carDropDown, setCarDropdown] = useState("");
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const handleDropdownChange = (e) => {
    const selectedPath = e.target.value;
    setCarDropdown(selectedPath);
    if (selectedPath) navigate(selectedPath);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row lg:gap-4 justify-center items-center">
      {/* Desktop Dropdown (optional)   */}
      <div className="hidden lg:block lg:text-xl text-xs font-semibold mb-3 text-center md:text-left">
        <select
          value={carDropDown}
          onChange={handleDropdownChange}
          className="border p-2 rounded"
        >
          <option value="">Select Car</option>
          {carCategoryData.map((div) => (
            <option value={div.path} key={div.name}>
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

        {/* Scrollable Links */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide w-full px-8 scroll-smooth"
        >
          {carCategoryData.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                to={cat.path}
                onClick={() => setActive(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition ${
                  active === cat.name
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-blue-100 text-gray-700"
                }`}
              >
                <Icon className="text-lg" />
                <span>{cat.name}</span>
              </Link>
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

      {/* Mobile Button */}
      <div className="lg:hidden mt-4 w-full flex justify-center">
        <button
          onClick={() => navigate("/car/all")}
          className="border bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Select Car
        </button>
      </div>
    </div>
  );
};

export default CarCategory;
