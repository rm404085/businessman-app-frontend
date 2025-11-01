import { useState, useEffect } from "react";

const ShortCategory = ({ setSelectedType }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeType, setActiveType] = useState(null);

  // === Local category data (with images for each type) ===
const categoryList = [
    {
      id: 1,
      name: "Travel",
      color: "bg-blue-500",
      icon: "🌍",
      types: [
        {
          name: "Beach",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
        },
        {
          name: "Mountain",
          image:
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
        },
        {
          name: "City",
          image:
            "https://images.unsplash.com/photo-1494526585095-c41746248156?w=400",
        },
      ],
    },
    {
      id: 2,
      name: "Food",
      color: "bg-red-500",
      icon: "🍜",
      types: [
        {
          name: "Street Food",
          image:
            "https://images.unsplash.com/photo-1600891964091-3ed3d6a9b53c?w=400",
        },
        {
          name: "Dessert",
          image:
            "https://images.unsplash.com/photo-1505253216365-51f74b1a2ae1?w=400",
        },
        {
          name: "Seafood",
          image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
        },
      ],
    },
    {
      id: 3,
      name: "Fashion",
      color: "bg-pink-500",
      icon: "👗",
      types: [
        {
          name: "Men",
          image:
            "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?w=400",
        },
        {
          name: "Women",
          image:
            "https://images.unsplash.com/photo-1521334884684-d80222895322?w=400",
        },
        {
          name: "Accessories",
          image:
            "https://images.unsplash.com/photo-1600185365229-33b804f2a3be?w=400",
        },
      ],
    },
  ]

  // === Combine all types for "All" category ===
  const allTypes = categoryList.flatMap((cat) =>
    cat.types.map((type) => ({
      ...type,
      category: cat.name,
    }))
  );

  const allCategory = {
    id: 0,
    name: "All",
    color: "bg-gray-700",
    icon: "⭐",
    types: allTypes,
  };

  const finalCategories = [allCategory, ...categoryList];

  // Set "All" category as default
  useEffect(() => {
    if (!selectedCategory) {
      setSelectedCategory(allCategory);
      setSelectedType(null);
    }
  }, [selectedCategory]);

  return (
    <div className="space-y-4 sticky top-0 bg-white z-30 pt-2">
      {/* CATEGORY BAR */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {finalCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat);
              setActiveType(null);
              setSelectedType(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 shadow-sm ${
              selectedCategory?.id === cat.id
                ? `${cat.color} text-white border-transparent`
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <span>{cat.icon}</span> {cat.name}
          </button>
        ))}
      </div>

      {/* TYPE IMAGE SCROLL */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-3">
        {selectedCategory?.types.map((type, i) => (
          <div
            key={i}
            onClick={() => {
              setActiveType(type.name);
              setSelectedType(type.name);
            }}
            className={`min-w-[100px] flex-shrink-0 rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer ${
              activeType === type.name
                ? "border-black scale-105"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <div className="relative w-full h-[45px]">
              <img
                src={type.image}
                alt={type.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <p className="text-white text-xs font-medium text-center">
                  {type.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortCategory;
