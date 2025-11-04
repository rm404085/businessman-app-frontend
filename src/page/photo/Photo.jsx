// pages/Photo.jsx
import { useEffect, useState } from "react";
import PhotoCard from "../../components/card/PhotoCard";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SearchButton from "../../components/ui/SearchBar";
import PhotoCategory from "../../components/Category/photoCategory/PhotoCategory";

const Photo = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.4,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 10, transition: { duration: 0.6 } },
  };

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("/photo.json")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
      });
  }, []);

  return (
    <div className="mx-auto mt-2">
      {/* ✅ Fixed Top Section */}
      <div className="sticky md:hidden block top-0 z-50 bg-white shadow-sm">
  <div className="p-2 border-b border-gray-200">
    <SearchButton />
  </div>
</div>

<motion.div
  ref={ref}
  variants={variants}
  initial="hidden"
  animate={controls}
  className=" sticky top-[40px] z-40 bg-white"
>
  <PhotoCategory />
</motion.div>


      {/* ✅ Scrollable Photo Grid */}
      <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-6 md:mt-12 mt-2">
        {photos.map((post) => (
          <PhotoCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Photo;
