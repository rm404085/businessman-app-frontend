import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const PhotoDetailsTab = ({ details }) => {
  const [showMore, setShowMore] = useState(false);

  // demo data — চাইলে props দিয়ে real data পাঠাতে পারো
  const demoDetails = details || {
    brand: "Premium Studio",
    material: "High-quality cotton blend",
    color: "Navy Blue",
    size: "M / L / XL",
    madeIn: "Bangladesh",
    description:
      "This photo product is made with premium materials and designed for style and durability. Ideal for professional shoots, portfolios, and digital showcases.",
    features: [
      "High-resolution quality",
      "Eco-friendly printing",
      "Scratch-resistant surface",
      "Long-lasting color retention",
    ],
  };

  return (
    <div className="bg-white rounded-2xl mb-16 shadow-sm p-4 mt-4">
      <h3 className="text-lg font-semibold mb-3 border-b pb-2">
        Product Details
      </h3>

      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>Brand:</strong> {demoDetails.brand}</p>
        <p><strong>Material:</strong> {demoDetails.material}</p>
        <p><strong>Color:</strong> {demoDetails.color}</p>
        <p><strong>Size:</strong> {demoDetails.size}</p>
        <p><strong>Made in:</strong> {demoDetails.madeIn}</p>
      </div>

      {/* Description */}
      <div className="mt-4">
        <h4 className="font-medium mb-1">Description</h4>
        <p className="text-gray-600 text-sm">
          {showMore
            ? demoDetails.description
            : demoDetails.description.slice(0, 100) + "..."}
        </p>
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-blue-600 text-xs mt-1 flex items-center gap-1"
        >
          {showMore ? (
            <>
              Show Less <ChevronUp size={14} />
            </>
          ) : (
            <>
              Read More <ChevronDown size={14} />
            </>
          )}
        </button>
      </div>

      {/* Features */}
      <div className="mt-4">
        <h4 className="font-medium mb-1">Key Features</h4>
        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
          {demoDetails.features.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PhotoDetailsTab;
