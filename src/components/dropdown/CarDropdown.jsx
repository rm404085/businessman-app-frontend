import React, { useState } from "react";

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
      Rupganj: {
        "Murapara Union": ["Murapara", "Rupganj"],
      },
      Sonargaon: {
        "Sonargaon Union": ["Panam City", "Meghna Ghat"],
      },
    },
  },
  Chattogram: {
    "Cox's Bazar": {
      Teknaf: {
        "Teknaf Union": ["Shamlapur", "Baharchhara"],
      },
      Ramu: {
        "Ramu Union": ["Chakmarkul", "Fatehpur"],
      },
    },
  },
};

const CarDropdown = () => {
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [union, setUnion] = useState("");
  const [village, setVillage] = useState("");

  return (
    <div className="w-full lg:w-[1200px] mx-auto mt-10 bg-gray-100 p-6 rounded-xl shadow-md flex flex-col lg:flex-row gap-4">
      <h2 className="text-xl font-semibold text-gray-700 text-center">
        🚗 Car Rent Location
      </h2>

      {/* Division */}
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
        <option value="">Select Division</option>
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
          <option value="">Select District</option>
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
          <option value="">Select Thana</option>
          {Object.keys(carLocationData[division][district]).map((thana) => (
            <option key={thana}>{thana}</option>
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
          <option value="">Select Union</option>
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
          <option value="">Select Village</option>
          {carLocationData[division][district][thana][union].map(
            (villageName) => (
              <option key={villageName}>{villageName}</option>
            )
          )}
        </select>
      )}

      {/* Done Button */}
      <button
        onClick={() => {
          alert(
            `Selected:\nDivision: ${division}\nDistrict: ${district}\nThana: ${thana}\nUnion: ${union}\nVillage: ${village}`
          );
        }}
        disabled={!village}
        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        Done
      </button>
    </div>
  );
};

export default CarDropdown;
