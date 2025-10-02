// pages/Photo.jsx
import { useEffect, useState } from "react";
import PhotoCard from "../../components/card/PhotoCard";

const Photo= () => {
  const [photos, setPhotos] = useState([])

  useEffect(()=>{

    fetch("/photo.json")
    .then((res)=> res.json())
    .then((data)=>{
        setPhotos(data)
    })

  }, [])

  return (
    <div className=" mx-auto my-28 px-4">
      <h1 className="text-2xl font-bold mb-6">Photo Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((post) => (
          <PhotoCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Photo;
