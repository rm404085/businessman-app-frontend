import MarketDropdown from "@/components/dropdown/MarketDropdown";
import {products} from "../../../public/data/products"
import MarketCard from "@/components/card/MarketCard";
import { useRef } from "react";


const Market = () => {

  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(".card")?.offsetWidth || 300;
    el.scrollBy({
      left: dir === "next" ? cardWidth + 20 : -(cardWidth + 20),
      behavior: "smooth",
    });
  };


  return(
    <div>
      <div className="mt-20 text-3xl flex justify-center items-center font-extrabold text-amber-800">
        Select your market place
      </div>
      <div>
        <MarketDropdown></MarketDropdown>
      </div>
      <div className="flex justify-between border border-b-4 p-2">
        <div>

        </div>
        <h1 className="text-3xl mt-2 text-violet-800 font-extrabold">Market Name</h1>
        <p className="text-sm font-semibold mt-8 ">Dhaka/Savar/AB</p>
      </div>

       <div className="mt-4 px-4 relative">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        🛒 Market Products
      </h2>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("prev")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 shadow-md rounded-full p-2 z-10 hover:scale-110 transition"
      >
        ‹
      </button>
      <button
        onClick={() => scroll("next")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 shadow-md rounded-full p-2 z-10 hover:scale-110 transition"
      >
        ›
      </button>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory mb-16 pb-4 px-8"
        style={{ scrollbarWidth: "thin" }}
      >
        {products.map((p) => (
          <div key={p.id} className="snap-start flex-shrink-0 lg:w-80 w-60 card">
            <MarketCard product={p} />
          </div>
        ))}
      </div>
    </div>

    </div>
  )
}

export default Market;