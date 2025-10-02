import { useState } from "react";

const BrandCategory = ({ brands, onBrandSelect }) => {
  const [selected, setSelected] = useState("All");

  const handleClick = (brand) => {
    setSelected(brand);
    onBrandSelect(brand); // 🔹 parent এ জানানো হচ্ছে কোন brand select হলো
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex gap-3 pb-3">
        {["All", ...brands].map((brand, i) => (
          <button
            key={i}
            onClick={() => handleClick(brand)}
            className={`px-5 py-2 rounded-full whitespace-nowrap transition ${
              selected === brand
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrandCategory;
