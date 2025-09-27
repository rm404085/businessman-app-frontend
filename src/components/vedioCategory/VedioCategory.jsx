import { useState } from "react";
import "../vedioCategory/Scrollbar.css"

const VedioCategory = () => {
     const [active, setActive] = useState("All");

    const categories = [
 "All",
  "Music",
  "Gaming",
  "News",
  "Sports",
  "Movies",
  "Live",
  "Podcasts",
  "Comedy",
  "Programming",
  "AI",
  "Travel",
  "Cooking",
  "All",
  "Music",
  "Gaming",
  "News",
  "Sports",
  "Movies",
  "Live",
  "Podcasts",
  "Comedy",
  "Programming",
  "AI",
  "Travel",
  "Cooking",
    ]

    return(
        <div className="top-12 sticky  z-40 bg-white">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 py-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition ${
              active === cat
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
    )
}
export default VedioCategory;