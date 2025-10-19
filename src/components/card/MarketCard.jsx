import { useEffect, useState } from "react";
import { FcManager } from "react-icons/fc";

const MarketCard = ({product}) => {

    const {productName, images} = product;
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto slide every 3 second

    useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);


     const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

    return(
      <div className="bg-white  rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.02] transition">
      {/* Product name */}
      <div className="p-3 flex justify-between border-b">
        <h3 className="text-sm md:text-base font-medium truncate text-gray-800">
          {productName}
        </h3>
        <button className=" px-1 flex gap-1 rounded-full">
            <span className="text-2xl">
               <FcManager />
         </span>
                
                 <span>10</span>
        </button>
      </div>

      {/* Image Slider */}
      <div className="relative lg:h-60 h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={productName}
          className="object-cover w-full h-full transition-all duration-700"
        />

        {/* Manual Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full px-2 py-1 shadow"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full px-2 py-1 shadow"
            >
              ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition ${
                    idx === currentIndex
                      ? "bg-violet-600 scale-110"
                      : "bg-white border border-gray-400"
                  }`}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
    )
}

export default MarketCard;