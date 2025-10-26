import { useState } from "react";
import { IoEllipsisVertical, IoCar } from "react-icons/io5";

const CarCard = ({ car }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos = car.images || [];
  const videos = car.videos || [];
  const inbox = car.inbox || [];
  const details = car.details || {};
  const contact = car.contact || {};
  
  const defaultTab = photos.length > 0 ? "Photo" : videos.length > 0 ? "Videos" : "Details" || "Contact";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleNext = () => {
    const arr = activeTab === "Photo" ? photos : videos;
    setCurrentIndex((prev) => (prev + 1) % arr.length);
  };

  const handlePrev = () => {
    const arr = activeTab === "Photo" ? photos : videos;
    setCurrentIndex((prev) => (prev === 0 ? arr.length - 1 : prev - 1));
  };

  const currentSrc = activeTab === "Photo" ? photos[currentIndex % photos.length] : videos[currentIndex % videos.length];

  return (
    <div className="bg-white  rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-lg">
            {car.profile.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{car.profile.name}</h3>
            <p className="text-xs text-gray-500">
              {car.location.division}, {car.location.district}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <button type="button" className="bg-slate-200 px-3 py-1 rounded-full text-xs">
            Inbox ({inbox.length})
          </button>
          <IoEllipsisVertical className="text-gray-500 text-xl cursor-pointer hover:text-gray-700" />
        </div>
      </div>
      <hr />

      {/* Media */}
      <div className="relative w-full min-h-[300px]">
        {activeTab === "Photo" && photos.length > 0 && (
          <img src={currentSrc} alt={`media-${currentIndex}`} className="w-full h-[300px] object-cover" />
        )}
        {activeTab === "Videos" && videos.length > 0 && (
          <video src={currentSrc} controls className="w-full h-[250px] object-cover" />
        )}

        {/* Navigation Arrows */}
        {(activeTab === "Photo" ? photos : videos).length > 1 && (activeTab === "Photo" || activeTab === "Videos") && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 px-2 py-1 rounded-full text-lg"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 px-2 py-1 rounded-full text-lg"
            >
              ›
            </button>
          </>
        )}

           {/* Details */}
      {activeTab === "Details" && (
        <div className="p-4 text-gray-800 text-sm md:text-base">
          <p><strong>Car Type:</strong> {details.carName}</p>
          <p><strong>Model:</strong> {details.model}</p>
          <p><strong>Color:</strong> {details.color}</p>
          <p><strong>Mileage:</strong> {details.mileage}</p>
          <p><strong>Price Per Day:</strong> {details.pricePerDay}</p>
          <p><strong>Contact:</strong> {car.contact.phone}, {car.contact.email}</p>
        </div>
      )}

      {
        activeTab === "Contact" && (
            <div className="p-4 text-gray-800 text-sm md:text-base">
       
          <p><strong>Contact:</strong> {car.contact.phone}, {car.contact.email}</p>
        </div>

        )
      }
      </div>

   

      {/* Tabs */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 bg-black/50 px-2 py-2 rounded-full text-xs text-white backdrop-blur-sm">
        {photos.length > 0 && (
          <button
            onClick={() => { setActiveTab("Photo"); setCurrentIndex(0); }}
            className={`px-2 py-0 flex gap-1 justify-center rounded-sm ${activeTab === "Photo" ? "bg-white text-black" : ""}`}
          >
            <span>Photo</span>
            <span>{photos.length > 0 ? `${currentIndex + 1}/${photos.length}` : "0/0"}</span>
          </button>
        )}
        {videos.length > 0 && (
          <button
            onClick={() => { setActiveTab("Videos"); setCurrentIndex(0); }}
            className={`px-2 py-0 flex gap-1 justify-center rounded-sm ${activeTab === "Videos" ? "bg-white text-black" : ""}`}
          >
            Videos
          </button>
        )}
        <button
          onClick={() => setActiveTab("Details")}
          className={`px-2 py-0 flex gap-1 justify-center rounded-sm ${activeTab === "Details" ? "bg-white text-black" : ""}`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab("Contact")}
          className={`px-2 py-0 flex gap-1 justify-center rounded-sm ${activeTab === "Contact" ? "bg-white text-black" : ""}`}
        >
          Contact
        </button>
      </div>
    </div>
  );
};

export default CarCard;
