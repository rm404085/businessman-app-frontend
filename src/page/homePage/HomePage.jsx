import VideoCard from "@/components/card/VedioCard";
import { useEffect, useState } from "react";

const HomePage = ()=> {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    
    fetch("/vedio.json") 
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 mt-28 mb-20 sm:grid-cols-2 m-0 md:grid-cols-3 gap-6 ">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default HomePage;