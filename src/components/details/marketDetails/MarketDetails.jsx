import { useParams, useSearchParams } from "react-router-dom";
import { products } from "../../../../public/data/products";
import { people } from "../../../../public/data/people";
import { useState } from "react";

const MarketDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const peopleCount = Number(searchParams.get("people")) || 1;

  const product = products.find((p) => p.id === Number(id));
  const selectedPeople = people.slice(0, peopleCount);

  const [currentImageIndex, setCurrentImageIndex] = useState({});

  if (!product) return <div className="p-5 text-red-500">Product not found.</div>;

  const handleNextImage = (personId, imagesLength) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [personId]: ((prev[personId] || 0) + 1) % imagesLength,
    }));
  };

  const handlePrevImage = (personId, imagesLength) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [personId]: ((prev[personId] || 0) - 1 + imagesLength) % imagesLength,
    }));
  };

  return (
    <div className="p-5 mt-16">
      {/* Product Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {product.productName}
        </h2>
        <p className="text-gray-500">
          Showing {peopleCount} people working on this product
        </p>
      </div>

      {/* People Grid */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
        {selectedPeople.map((person) => {
          const activeIndex = currentImageIndex[person.id] || 0;
          return (
            <div
              key={person.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              {/* Info + Image row */}
              <div className="flex flex-row w-full">
                {/* Left Info */}
                <div className="p-4 flex-1 flex flex-col justify-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {person.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{person.location}</p>
                </div>

                {/* Right Image Slider */}
                <div className="relative w-1/2 h-40 sm:h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={person.images[activeIndex]}
                    alt={person.name}
                    className="w-full h-full object-cover transition-all duration-500"
                  />

                  {person.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          handlePrevImage(person.id, person.images.length)
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-lg rounded-full px-2 py-1 shadow"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() =>
                          handleNextImage(person.id, person.images.length)
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-lg rounded-full px-2 py-1 shadow"
                      >
                        ›
                      </button>
                    </>
                  )}

                  {/* Dots */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {person.images.map((_, idx) => (
                      <div
                        key={idx}
                        onClick={() =>
                          setCurrentImageIndex((prev) => ({
                            ...prev,
                            [person.id]: idx,
                          }))
                        }
                        className={`w-2 h-2 rounded-full cursor-pointer transition ${
                          idx === activeIndex
                            ? "bg-violet-600 scale-110"
                            : "bg-white border border-gray-400"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="flex justify-center gap-3 p-4 border-t">
                <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition text-sm sm:text-base">
                  View Profile
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm sm:text-base">
                  Message
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketDetails;
