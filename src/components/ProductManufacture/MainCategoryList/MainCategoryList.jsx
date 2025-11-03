import React from "react";

const MainCategoryList = ({ data, setSelectedMainCat }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-violet-700">
        Select Product Category
      </h2>

      {/* Horizontal scroll container */}
      <div className="flex gap-6 overflow-x-auto pb-4 px-2 scrollbar-hide">
        {data.mainCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedMainCat(cat.name)}
            className="min-w-[120px] cursor-pointer flex-shrink-0 text-center hover:scale-105 transition-transform"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-24 h-24 mx-auto rounded-xl shadow-md object-cover"
            />
            <p className="mt-2 font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCategoryList;
