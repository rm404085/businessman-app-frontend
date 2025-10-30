import { useState } from "react";
import { Star, MessageCircle } from "lucide-react";
import ReviewForm from "@/components/form/ReviewForm";

const demoReviews = [
  {
    name: "Rahim Uddin",
    rating: 5,
    comment: "Excellent product! Quality is just like the pictures.",
    images: ["/img/rev1.jpg", "/img/rev2.jpg"],
  },
  {
    name: "Karim Mia",
    rating: 4,
    comment: "Good quality but delivery was a bit late.",
  },
  {
    name: "Anika",
    rating: 5,
    comment: "Highly recommend! Packaging was awesome.",
  },
  {
    name: "Rafiul",
    rating: 3,
    comment: "Okay product. Expected a bit better.",
  },
];

const PhotoReview = ({reviewFormRef}) => {
  const [reviews, setReviews] = useState(demoReviews);
  const [showAll, setShowAll] = useState(false);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  const handleAddReview = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="bg-white rounded-2xl mb-10 shadow-sm p-4 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2 mb-3">
        <h3 className="text-lg font-semibold">Customer Reviews</h3>
        <span className="text-sm text-gray-500">{reviews.length} Reviews</span>
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {visibleReviews.map((r, i) => (
          <div key={i} className="border rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                {r.name[0]}
              </div>
              <div>
                <p className="font-medium">{r.name}</p>
                <div className="flex">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < r.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Review Text */}
            <p className="text-gray-600 mt-2 text-sm">{r.comment}</p>

            {/* Review Images */}
            {r.images && r.images.length > 0 && (
              <div className="flex gap-2 mt-3">
                {r.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="review"
                    className="w-14 h-14 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}

            {/* Interaction */}
            <div className="flex justify-end mt-2">
              <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 text-sm">
                <MessageCircle size={16} /> Reply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More */}
      {reviews.length > 3 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 text-sm font-medium"
          >
            {showAll ? "Show Less" : "View All Reviews"}
          </button>
        </div>
      )}

      {/* Review Form */}
      <div ref={reviewFormRef} className="mt-5">
        <ReviewForm onAddReview={handleAddReview} />
      </div>
    </div>
  );
};

export default PhotoReview;
