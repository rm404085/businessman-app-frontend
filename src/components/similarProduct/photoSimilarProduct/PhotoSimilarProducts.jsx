import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";

const PhotoSimilarProducts = () => {
  // তোমার নিজের “real” প্রোডাক্ট ডেটা
  const realProducts = [
    {
      id: 1,
      name: "Wedding Photography Package",
      price: 8500,
      image: "/img/wedding.jpg",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Outdoor Portrait Session",
      price: 4500,
      image: "/img/portrait.jpg",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Studio Product Shoot",
      price: 5500,
      image: "/img/studio.jpg",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Event Coverage Full Day",
      price: 12500,
      image: "/img/event.jpg",
      rating: 5,
    },
  ];

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white mb-14 rounded-2xl shadow-sm p-4 mt-4">
      <h3 className="text-lg font-semibold mb-3 border-b pb-2">
        Similar Products
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {realProducts.map((item) => (
          <div
            key={item.id}
            className="relative border rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover group-hover:scale-105 transition"
              />
              <button
                onClick={() => toggleFavorite(item.id)}
                className={`absolute top-2 right-2 rounded-full p-1.5 ${
                  favorites.includes(item.id)
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-600"
                } shadow hover:scale-110 transition`}
              >
                <Heart size={18} />
              </button>
            </div>

            <div className="p-2 text-sm">
              <p className="font-medium line-clamp-1">{item.name}</p>
              <p className="text-blue-600 font-semibold mt-1">
                ৳ {item.price.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ⭐ {item.rating.toFixed(1)}
              </p>

              <button className="mt-2 w-full flex items-center justify-center gap-1 bg-blue-600 text-white text-xs py-1.5 rounded-lg hover:bg-blue-700 active:scale-95 transition">
                <ShoppingCart size={14} /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoSimilarProducts;
