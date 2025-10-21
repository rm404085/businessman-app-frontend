import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";

const RentCard = ({item}) => {

const photos = item.photos || [];
const videos = item.videos || [];


  const [currentIndex, setCurrentIndex] = useState(0) 



  const defaultTab = item.photos.length > 0 ? "photos" : item.videos.length > 0 ? "videos" : "details";

  
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleNext = () => {
    const arr = activeTab === "photos" ? photos : videos;
    setCurrentIndex((prev) => (prev + 1) % arr.length);
  };

   const handlePrev = () => {
    const arr = activeTab === "photos" ? photos : videos;
    setCurrentIndex((prev) => (prev === 0 ? arr.length - 1 : prev - 1));
  };



 const currentSrc =
    activeTab === "photos"
      ? photos[currentIndex % photos.length]
      : videos[currentIndex % videos.length];

  const isVideo = currentSrc?.includes(".mp4");

  
 

    return(
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
             {/* Header */}
             <div className="flex items-center justify-between gap-2 p-2">
               <div className="flex items-center gap-2">
                 <div
                   
                 >
                  <img src={item.profile.photo} alt={item.profile.photo} className={`w-10 h-10 rounded-full bg-gradient-to-tr ${item.profile.photo} flex items-center justify-center font-bold text-lg`}/>
                 </div>
                 <div>
                   <h3 className="font-semibold text-gray-800">{item.rentName}</h3>
                   <p className="text-xs text-gray-500">{item.location}</p>
                 </div>
               </div>
             <div className="flex justify-center">
                 <button type="button" className="bg-slate-200 px-4 mr-4 rounded-full">Contact</button>
               
             </div>
             </div>
             <hr />
             <div className="relative w-full min-h-[350px]">
              {
                activeTab === "photos" && photos.length > 0 && (
                  <img src={currentSrc} alt=""
                  className="w-full h-[350px] object-cover"
                   />
                )
              }

               {activeTab === "Videos" && videos.length > 0 && (
          <video
            src={currentSrc}
            controls
            className="w-full h-[300px] object-cover"
          />
        )}

        {activeTab === "details" && (
          <div className="p-4 text-gray-800 text-sm md:text-base">
            {item.details || "No details available."}
          </div>
        )}

        {(activeTab === "photos" ? photos : videos).length > 1 &&
          (activeTab === "photos" || activeTab === "Videos") && (
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

          <div className="flex absolute bottom-3 -translate-x-1/2 left-1/2 gap-6 py-1 bg-black/35 px-4 rounded-full text-xs backdrop-blur-sm  ">
            <button
            onClick={()=>{
              setActiveTab("photos")
              setCurrentIndex(0)
              
            }}
            className={`px-1 w-20 py-0 flex gap-1 justify-center rounded-sm ${
            activeTab === "photos" ? "bg-white text-black" : ""
          }`}
            >
              <span>photos</span>
              <span>
               {
                 photos.length > 0 ? `${currentIndex + 1}/ ${photos.length}`: "0/0"
               }
              </span>
            </button>

            <button
          onClick={() => {
            setActiveTab("Videos");
            setCurrentIndex(0);
          }}
          className={`px-2 py-0 flex gap-1 justify-center rounded-sm ${
            activeTab === "Videos" ? "bg-white text-black" : ""
          }`}
        >
          <span>Videos</span>
          <span>{videos.length}</span>
        </button>
        <button
          onClick={() => setActiveTab("details")}
          className={`px-2 py-0 flex gap-1 justify-center rounded-sm ${
            activeTab === "details" ? "bg-white text-black" : ""
          }`}
        >
          Details
        </button>
          </div>
              
             </div>
            <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-xl mt-2">
  {/* Category */}
  <button className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-full hover:bg-blue-200 transition">
    {item.category}
  </button>

  {/* Type */}
  <button className="px-4 py-2 bg-green-100 text-green-700 font-medium rounded-full hover:bg-green-200 transition">
    {item.type}
  </button>

  {/* Options */}
  <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition">
    <IoEllipsisVertical className="text-gray-600 text-xl" />
  </button>
</div>

            
       </div>
            
    )
}

export default RentCard;