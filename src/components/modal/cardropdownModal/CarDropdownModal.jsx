import React, { useState } from "react";
import "../cardropdownModal/slider.css";
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
import { IoCar } from "react-icons/io5";

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

const carLocationData = {
  Dhaka: {
    Gazipur: {
      Tongi: {
        "Tongi Union": ["Kamarpara", "Cherag Ali", "Tongi College Gate"],
        "Ershad Nagar": ["Block A", "Block B"],
      },
      Kaliakoir: {
        "Mouchak Union": ["Mouchak Bazar", "Mouchak West"],
        "Boali Union": ["Boali North", "Boali South"],
      },
    },
    Narayanganj: {
      Rupganj: { "Murapara Union": ["Murapara", "Rupganj"] },
      Sonargaon: { "Sonargaon Union": ["Panam City", "Meghna Ghat"] },
    },
  },
  Chattogram: {
    "Cox's Bazar": {
      Teknaf: { "Teknaf Union": ["Shamlapur", "Baharchhara"] },
      Ramu: { "Ramu Union": ["Chakmarkul", "Fatehpur"] },
    },
  },
};

const CarDropdownModal = ({ setOpenModal, setSelectedCar, setSelectedLocation }) => {
  const [car, setCar] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [union, setUnion] = useState("");
  const [village, setVillage] = useState("");

  const handleDone = () => {
    const locationString = `${division} > ${district} > ${thana} > ${union} > ${village}`;
    setSelectedCar(car);
    setSelectedLocation(locationString);
    setOpenModal(false);
  };

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modalBackground") {
      setOpenModal(false);
    }
  };

  return (
    <div
      id="modalBackground"
      onClick={handleBackgroundClick}
      className="fixed h-full inset-0 bg-black/40 flex items-start justify-center z-50 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl p-6 shadow-2xl w-[95%] max-w-2xl mt-10 animate-slideDown transition-all duration-500 relative">
        {/* Close Button */}
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl flex gap-2 justify-center items-center flex-row font-semibold text-gray-800 mb-6 text-center">
          <span>
            <IoCar />
          </span>
          <span>Select Car & Location</span>
        </h2>

        {/* ===== CAR CATEGORY ===== */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Select Car Type</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-56 overflow-y-auto">
            {carCategoryData.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => setCar(item.name)}
                  className={`flex items-center gap-2 border p-2 rounded-lg transition ${
                    car === item.name
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-blue-100"
                  }`}
                >
                  <Icon />
                  <span className="text-sm">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===== LOCATION SELECTION ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Division */}
          <label htmlFor="" className="text-2xl font-bold">Location</label>
          <select
            value={division}
            onChange={(e) => {
              setDivision(e.target.value);
              setDistrict("");
              setThana("");
              setUnion("");
              setVillage("");
            }}
            className="border p-2 rounded"
          >
            <option value="">Division</option>
            {Object.keys(carLocationData).map((div) => (
              <option key={div}>{div}</option>
            ))}
          </select>

          {/* District */}
          {division && (
            <select
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setThana("");
                setUnion("");
                setVillage("");
              }}
              className="border p-2 rounded"
            >
              <option value="">District</option>
              {Object.keys(carLocationData[division]).map((dis) => (
                <option key={dis}>{dis}</option>
              ))}
            </select>
          )}

          {/* Thana */}
          {district && (
            <select
              value={thana}
              onChange={(e) => {
                setThana(e.target.value);
                setUnion("");
                setVillage("");
              }}
              className="border p-2 rounded"
            >
              <option value="">Thana</option>
              {Object.keys(carLocationData[division][district]).map((th) => (
                <option key={th}>{th}</option>
              ))}
            </select>
          )}

          {/* Union */}
          {thana && (
            <select
              value={union}
              onChange={(e) => {
                setUnion(e.target.value);
                setVillage("");
              }}
              className="border p-2 rounded"
            >
              <option value="">Union</option>
              {Object.keys(carLocationData[division][district][thana]).map(
                (uni) => (
                  <option key={uni}>{uni}</option>
                )
              )}
            </select>
          )}

          {/* Village */}
          {union && (
            <select
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Village</option>
              {carLocationData[division][district][thana][union].map((vil) => (
                <option key={vil}>{vil}</option>
              ))}
            </select>
          )}
        </div>

        {/* ===== DONE BUTTON ===== */}
        <button
          onClick={handleDone}
          disabled={!car || !division}
          className={`mt-6 w-full ${
            car && division
              ? "bg-blue-700 hover:bg-blue-800"
              : "bg-gray-400 cursor-not-allowed"
          } text-white py-2 rounded-lg font-semibold transition`}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default CarDropdownModal;
