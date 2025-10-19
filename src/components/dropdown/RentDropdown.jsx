import React, { useState } from "react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const rentData = {
  Flat: {
    Family: ["1 Bedroom", "2 Bedroom", "3 Bedroom"],
    Bachelor: ["Single Room", "Shared Room"],
  },
  Shop: {
    Small: ["100 sqft", "200 sqft"],
    Large: ["500 sqft", "1000 sqft"],
  },
  Office: {
    "Co-working": ["Hot Desk", "Private Office"],
    "Full Floor": ["1000 sqft", "2000 sqft"],
  },
  Garage: {
    Car: ["1 Slot", "2 Slot"],
    Bike: ["Single", "Double"],
  },
};

const placeData = {
  Dhaka: {
    Dhaka: ["Dhanmondi", "Mirpur", "Uttara"],
    Gazipur: ["Tongi", "Kaliakoir"],
  },
  Chattogram: {
    Chattogram: ["Pahartali", "Kotwali"],
    "Cox's Bazar": ["Teknaf", "Ramu"],
  },
  Rajshahi: {
    Rajshahi: ["Boalia", "Rajpara"],
    Natore: ["Lalpur", "Singra"],
  },
};

const RentDropdown = () => {
  // Rent state
  const [rentType, setRentType] = useState("");
  const [rentCategory, setRentCategory] = useState("");
  const [rentOption, setRentOption] = useState("");

  // Place state
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");

  return (
    <div>
        <div className="flex flex-row md:flex-row justify-between gap-10 p-5 bg-gray-100 rounded-xl">
      {/* ---------- RENT SIDE ---------- */}
      <div className="flex flex-col gap-3 w-1/2 md:w-1/2">
        <h2 className="font-semibold text-lg text-gray-700">🏠 Rent</h2>

        {/* 1st level */}
        <select
          value={rentType}
          onChange={(e) => {
            setRentType(e.target.value);
            setRentCategory("");
            setRentOption("");
          }}
          className="border p-2 rounded"
        >
          <option value="">Select Type</option>
          {Object.keys(rentData).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* 2nd level */}
        {rentType && (
          <select
            value={rentCategory}
            onChange={(e) => {
              setRentCategory(e.target.value);
              setRentOption("");
            }}
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>
            {Object.keys(rentData[rentType]).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        )}

        {/* 3rd level */}
        {rentCategory && (
          <select
            value={rentOption}
            onChange={(e) => setRentOption(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Option</option>
            {rentData[rentType][rentCategory].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        )}
      </div>

      {/* ---------- PLACE SIDE ---------- */}
      <div className="flex flex-col gap-3 w-1/2 md:w-1/2">
       
         <h2 className="font-semibold  text-gray-700">📍 Place</h2>
        

        {/* Division */}
        <select
          value={division}
          onChange={(e) => {
            setDivision(e.target.value);
            setDistrict("");
            setThana("");
          }}
          className="border p-2 rounded"
        >
          <option value="">Select Division</option>
          {Object.keys(placeData).map((div) => (
            <option key={div} value={div}>
              {div}
            </option>
          ))}
        </select>

        {/* District */}
        {division && (
          <select
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setThana("");
            }}
            className="border p-2 rounded"
          >
            <option value="">Select District</option>
            {Object.keys(placeData[division]).map((dis) => (
              <option key={dis}>{dis}</option>
            ))}
          </select>
        )}

        {/* Thana */}
        {district && (
          <select
            value={thana}
            onChange={(e) => setThana(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Area</option>
            {placeData[division][district].map((thana) => (
              <option key={thana}>{thana}</option>
            ))}
          </select>
        )}
      </div>

      {/* ---------- DONE BUTTON ---------- */}
      <div className="hidden md:block">
        <div className="flex   items-end justify-center md:justify-end md:w-[150px]">
        <button
          onClick={() => {
            alert(
              `Rent: ${rentType} > ${rentCategory} > ${rentOption}\nPlace: ${division} > ${district} > ${thana}`
            );
          }}
          className="bg-blue-600  text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Done
        </button>
      </div>
      </div>
    </div>
    
    </div>
  );
};

export default RentDropdown;
