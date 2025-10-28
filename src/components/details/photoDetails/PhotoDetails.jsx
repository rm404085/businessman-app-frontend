import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoArrowBack, IoCartOutline, } from "react-icons/io5";
import PhotoTabs from "@/components/ui/PhotoTabs";
import { BsThreeDots } from "react-icons/bs";
import PhotoMenuModal from "@/components/modal/photoModal/PhotoMenuModal";


const PhotoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [activeTab, setActiveTab] = useState("Photo");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  // Fetch data
  useEffect(() => {
    fetch("/photo.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id.toString() === id);
        setPhoto(found);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!photo) return <div className="p-4">Loading...</div>;

  // Photos & Videos Arrays
  const photos = [photo.image, ...(photo.gallery || [])];
  const videos = photo.videos || [];

  const currentArray = activeTab === "Photo" ? photos : videos;
  const currentSrc = currentArray.length > 0 ? currentArray[currentIndex % currentArray.length] : null;

  // Navigation
  const handleNext = () => {
    if (currentArray.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % currentArray.length);
  };
  const handlePrev = () => {
    if (currentArray.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? currentArray.length - 1 : prev - 1));
  };

  return (
    <div>
        {/* Back Button */}
      <div className="flex justify-between">
        <button
        onClick={() => navigate(-1)}
        className="bg-white p-2 rounded-full shadow hover:bg-gray-100 "
      >
        <IoArrowBack className="text-xl" />
      </button>
       <div
        className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <BsThreeDots size={22} />
      </div>
      {
        open && (
            <PhotoMenuModal open={open} setOpen={setOpen}></PhotoMenuModal>
        )
      }
      </div>
    <div className="min-h-screen bg-gray-50 relative">
     

      {/* Main Media */}
      <div className="w-full min-h-[350px] bg-black flex items-center justify-center relative">
       
        {activeTab === "Photo" && currentSrc && (
          <img src={currentSrc} alt={photo.title} className="w-full h-[350px] object-cover" />
        )}
        {activeTab === "Video" && currentSrc && (
          <video src={currentSrc} controls className="w-full h-[300px] object-cover" />
        )}

        {/* Navigation Arrows */}
        {currentArray.length > 1 && (
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

        {/* Photo / Video Tabs */}
        {(photos.length > 0 || videos.length > 0) && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 px-3 py-1 rounded-full text-xs text-white backdrop-blur-sm">
            {photos.length > 0 && (
              <button
                onClick={() => { setActiveTab("Photo"); setCurrentIndex(0); }}
                className={`px-2 py-0 rounded-sm ${activeTab === "Photo" ? "bg-white text-black" : ""}`}
              >
                Photo {photos.length > 1 ? `${currentIndex + 1}/${photos.length}` : ""}
              </button>
            )}
            {videos.length > 0 && (
              <button
                onClick={() => { setActiveTab("Video"); setCurrentIndex(0); }}
                className={`px-2 py-0 rounded-sm ${activeTab === "Video" ? "bg-white text-black" : ""}`}
              >
                Video {videos.length > 1 ? `${currentIndex + 1}/${videos.length}` : ""}
              </button>
            )}
          </div>
        )}
      </div>

       <h4 className="text-xl px-2">
    Price Tk 220
  </h4>

      {/* Description / Info */}
      <div className="p-2 bg-white border-b">
        <h2 className="text-xl font-semibold mb-2">{photo.title}</h2>
        <p className="text-gray-700 text-sm">{photo.description}</p>
      </div>
      <div className="flex">
        <div className="w-16 h-16 p-2">
            <img src={photo.user.avatar}  alt={photo.user.name} className="rounded-lg" />
        </div>
       <div>
         <h2 className="text-2xl font-semibold">
            Company Name
        </h2>
        <p>
            Working............Detail
        </p>
       </div>
      </div>
      <div>
        <PhotoTabs></PhotoTabs>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] py-1 px-4 flex items-center justify-between z-50">
      
      {/* Left side buttons (icons only) */}
      <div className="flex items-center gap-5">
        
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition">
          <IoCartOutline size={22} />
          <span className="text-[11px] mt-1">Add to Cart</span>
        </button>
      </div>

      {/* Right side buttons */}
      <div className="flex gap-2 w-[75%]">
        <button className="flex-1 border border-violet-900  py-1 rounded-full font-semibold text-sm active:scale-95 transition-all duration-200 shadow-sm">
          Chat Now
        </button>
        <button className="flex-1  border border-violet-900  py-1 rounded-full font-semibold text-sm active:scale-95 transition-all duration-200 shadow-sm">
          Order Now
        </button>
      </div>

    </div>

    </div>
    </div>
  );
};

export default PhotoDetails;
