import { useEffect, useState } from "react";
import ShortCard from "@/components/card/ShortCard";
import ShortCategory from "@/components/Category/ShortCategory/ShortCategory";

const Short = () => {
  const [shorts, setShorts] = useState([]);
  const [filteredShorts, setFilteredShorts] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    fetch("/shorts.json")
      .then((res) => res.json())
      .then((data) => {
        setShorts(data);
        setFilteredShorts(data); // show all by default
      });
  }, []);

  useEffect(() => {
    if (selectedType) {
      const filtered = shorts.filter((short) => short.type === selectedType);
      setFilteredShorts(filtered);
    } else {
      setFilteredShorts(shorts);
    }
  }, [selectedType, shorts]);

  return (
    <div className="p-3 lg:px-40">
      <ShortCategory setSelectedType={setSelectedType} />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
        {filteredShorts.length > 0 ? (
          filteredShorts.map((short) => (
            <ShortCard key={short.id} short={short} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No shorts found for this category
          </p>
        )}
      </div>
    </div>
  );
};

export default Short;
