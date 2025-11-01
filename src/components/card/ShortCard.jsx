import { useNavigate } from "react-router";

const ShortCard = ({ short }) => {

  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log("card click", short.id)
    navigate(`/short/${short.id}`)
  }
  
  return (
    <div 
    onClick={handleCardClick}
    className="relative w-full h-[250px] bg-black rounded-xl overflow-hidden shadow-md">
      {/* Video or Image */}
      {short.type === "video" ? (
        <video
          src={short.src}
          className="w-full h-full object-cover"
          loop
          autoPlay
          muted
        />
      ) : (
        <img
          src={short.photos}
          alt="short"
          className="w-full h-full object-cover"
        />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Description Text */}
      <p className="absolute bottom-2 left-2 text-white text-sm font-medium z-10 ">
        {short.description}
      </p>
    </div>
  );
};

export default ShortCard;
