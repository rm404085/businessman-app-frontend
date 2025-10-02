import { useParams } from "react-router";
import BrandCategory from "../../components/Category/BrandCategory";

import HomePage from "../homePage/HomePage";
import { useState } from "react";

// প্রতিটি category অনুযায়ী brand list
const brandOptions = {
  shirt: ["Nike", "Adidas", "Puma"],
  pant: ["Levis", "Lee", "Wrangler"],
  shoe: ["Bata", "Apex", "Lotto"],
  mobile: ["Samsung", "Apple", "Xiaomi"],
  laptop: ["Dell", "HP", "Asus", "MacBook"],
  default: ["Generic"],
};

const CategoryPage = () => {
  const { categoryName } = useParams();
   const [selectedBrand, setSelectedBrand] = useState("All");

  const brands = brandOptions[categoryName] || brandOptions.default;

  return (
    <div className="p-6 my-28">
      <h2 className="text-xl font-bold mb-4 capitalize">
        {categoryName} Brand Categories
      </h2>

      {/* 🔹 Horizontal Brand Category */}
      <BrandCategory
        brands={brands}
        onBrandSelect={(brand) => setSelectedBrand(brand)}
      />
      <div>
        <HomePage category={categoryName} brand={selectedBrand}></HomePage>
      </div>
    </div>
  );
};

export default CategoryPage;
