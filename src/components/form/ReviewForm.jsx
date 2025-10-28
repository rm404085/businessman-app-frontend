import { useState } from "react";
import { Star } from "lucide-react";

const ReviewForm = ({ onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return alert("Please give rating & comment");

    const newReview = {
      name: "Guest User",
      rating,
      comment,
      images: [],
    };
    onAddReview(newReview);
    setRating(0);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-2xl p-4 bg-white shadow-sm mt-4"
    >
      <h3 className="text-lg font-semibold mb-2">Write a Review</h3>

      {/* Rating */}
      <div className="flex gap-1 mb-3">
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

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your experience..."
        className="w-full border rounded-xl p-2 text-sm focus:ring focus:ring-blue-200 outline-none"
        rows="3"
      />

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
