import ManufactureCard from "@/components/card/ManufactureCard";
import VideoCard from "@/components/card/VideoCard";
import { useEffect, useState } from "react";

const Manufacture = ({ category, brand }) => {
  const [videos, setVideos] = useState([]);
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/vedio.json")
      .then((res) => res.json())
      .then((data) => {
        let filtered = data;

        // category অনুযায়ী ফিল্টার
        if (category) {
          filtered = filtered.filter(
            (video) =>
              video.category?.toLowerCase() === category.toLowerCase()
          );
        }
 // 🔹 Brand filter (কেবল তখনই filter হবে যখন brand "All" না)
        if (brand && brand !== "All") {
          filtered = filtered.filter(
            (video) => video.brand?.toLowerCase() === brand.toLowerCase()
          );
        }

        setVideos(filtered);
        setLoading(false)
      })
      .catch((err) => console.error("Error fetching videos:", err));
  }, [category, brand]);

    if (loading) {
    // 🔹 Loader দেখাবে যতক্ষণ data আসেনি
    return (
      <div className="flex items-center gap-4 justify-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-pulse">
          
        </div>
        <div className="text-2xl">
          loading...
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 mt-28 mb-20 sm:grid-cols-2 m-0 md:grid-cols-3 gap-6 ">
      {videos.length > 0 ? (
        videos.map((video) => <ManufactureCard key={video.id} video={video} />)
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No videos found for {category || "this selection"}
        </p>
      )}
    </div>
  );
};

export default Manufacture;
