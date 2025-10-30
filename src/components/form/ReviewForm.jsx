import { useRef, useState } from "react";
import { Star } from "lucide-react";
import { MdAttachFile } from "react-icons/md";

const ReviewForm = ({ onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [mideaPreview, setMideaPreview] = useState([])
  const fileRef = useRef();
  const reviewFormRef = useRef(null);



  const handleSubmit = (e) => {
    e.preventDefault();
    

    const newReview = {
      name: "Guest User",
      rating,
      comment,
      images: mideaPreview,
    };
    onAddReview(newReview);
    setRating(0);
    setComment("");
    setMideaPreview([]);
  if (fileRef.current) fileRef.current.value = "";
  };

  const handleMidea = (e) =>{
    const files = Array.from(e.target.files || [])
    if(files.length > 0) {
      const Previews = files.map((file)=>URL.createObjectURL(file))
      setMideaPreview((prev)=>[...prev, ...Previews])

    }

  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-2xl p-4 bg-white shadow-sm mt-4"
      ref={reviewFormRef}
    >
      <h3 className="text-lg font-semibold mb-2">Write a Review</h3>

      {/* Rating */}
      <div className="flex justify-between  mb-3">
       <div className="flex gap-1">
         {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            onClick={() => setRating(i + 1)}
            className={`w-6 h-6 cursor-pointer transition ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 hover:text-yellow-400"
            }`}
          />
        ))}
       </div>
       <div >
        <label className="cursor-pointer  text-orange-900 text-2xl flex-shrink-0 hover:scale-110 transition">
      <MdAttachFile
        size={30}
         />
         <input 
         ref={fileRef}
         type="file"
         accept="image/*,video/*"
         className="hidden"
         onChange={handleMidea}
          />

        </label>
        
       </div>
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your experience..."
        className="w-full border rounded-xl p-2 text-sm focus:ring focus:ring-blue-200 outline-none"
        rows="3"
      />
      <div>
        {
          mideaPreview && mideaPreview.length > 0 && (
            <div className="mt-4 grid grid-cols-3 md:grid-cols-2 gap-3">
              {
                mideaPreview.map((src, index)=>(
                  <div key={index} className="relative bg-gray-100 rounded-xl overflow-hidden">
                    {
                      src.includes("video") ? (
                        <video src={src} controls 
                        className="w-full h-40 object-cover rounded-xl"
                        >

                        </video>
                      )
                      : (
                        <img src={src} alt={`preview-${index}`} 
                        className="w-full h-40 object-cover rounded-xl"
                        />
                      )
                    }
                    <button onClick={()=>{
                      setMideaPreview(mideaPreview.filter((_,i) => i !== index))
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                    >
                      ✖
                    </button>

                  </div>
                ))
              }
            </div>

          )
        }
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-3 w-full bg-blue-600 text-white rounded-xl py-2 font-medium hover:bg-blue-700 active:scale-95 transition"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
