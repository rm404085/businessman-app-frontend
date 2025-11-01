import { useState } from "react";
import { Star, MessageCircle, SendHorizonal, ThumbsUp } from "lucide-react";
import ReviewForm from "@/components/form/ReviewForm";

const demoReviews = [
  {
    id: 1,
    name: "Rahim Uddin",
    rating: 5,
    comment: "Excellent product! Quality is just like the pictures.",
    images: ["/img/rev1.jpg", "/img/rev2.jpg"],
    replies: [
      {
        id: 11,
        name: "Shop Owner",
        comment: "Thank you so much, Rahim!",
        likes: 2,
        liked: false,
      },
    ],
  },
  {
    id: 2,
    name: "Karim Mia",
    rating: 4,
    comment: "Good quality but delivery was a bit late.",
    replies: [],
  },
  {
    id: 3,
    name: "Anika",
    rating: 5,
    comment: "Highly recommend! Packaging was awesome.",
    replies: [],
  },
];

const PhotoReview = ({ reviewFormRef }) => {
  const [reviews, setReviews] = useState(demoReviews);
  const [showAll, setShowAll] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  // ✅ Add new review
  const handleAddReview = (newReview) => {
    setReviews([{ ...newReview, id: Date.now(), replies: [] }, ...reviews]);
  };

  // ✅ Add a reply to a specific review
  const handleAddReply = (reviewId) => {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      name: "You",
      comment: replyText,
      likes: 0,
      liked: false,
    };

    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? { ...review, replies: [...review.replies, newReply] }
          : review
      )
    );

    setReplyText("");
    setReplyingTo(null);
  };

  // ✅ Toggle Like on a reply
  const handleToggleLike = (reviewId, replyId) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              replies: review.replies.map((rep) =>
                rep.id === replyId
                  ? {
                      ...rep,
                      liked: !rep.liked,
                      likes: rep.liked ? rep.likes - 1 : rep.likes + 1,
                    }
                  : rep
              ),
            }
          : review
      )
    );
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
        {visibleReviews.map((r) => (
          <div key={r.id} className="border rounded-xl p-3">
            {/* Top Info */}
            <div className="flex items-center gap-2 mb-1">
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

            {/* Reply Button */}
            <div className="flex justify-end mt-2">
              <button
                onClick={() =>
                  setReplyingTo(replyingTo === r.id ? null : r.id)
                }
                className="flex items-center gap-1 text-gray-500 hover:text-blue-600 text-sm"
              >
                <MessageCircle size={16} /> Reply
              </button>
            </div>

            {/* Reply Box */}
            {replyingTo === r.id && (
              <div className="mt-3 ml-8 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 border rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <button
                  onClick={() => handleAddReply(r.id)}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
                >
                  <SendHorizonal size={16} />
                </button>
              </div>
            )}

            {/* Reply List */}
            {r.replies.length > 0 && (
              <div className="ml-10 mt-3 space-y-2">
                {r.replies.map((rep) => (
                  <div key={rep.id} className="flex gap-2 items-start">
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold text-sm">
                      {rep.name[0]}
                    </div>

                    {/* Reply bubble */}
                    <div className="bg-gray-100 px-3 py-1.5 rounded-2xl max-w-[80%]">
                      <p className="text-sm font-medium">{rep.name}</p>
                      <p className="text-xs text-gray-700">{rep.comment}</p>

                      {/* Like button under reply */}
                      <div className="flex items-center gap-1 mt-1">
                        <button
                          onClick={() => handleToggleLike(r.id, rep.id)}
                          className={`flex items-center gap-1 text-[11px] font-medium ${
                            rep.liked
                              ? "text-blue-600"
                              : "text-gray-500 hover:text-blue-500"
                          }`}
                        >
                          <ThumbsUp size={12} />
                          {rep.liked ? "Liked" : "Like"}
                        </button>
                        {rep.likes > 0 && (
                          <span className="text-[11px] text-gray-500">
                            {rep.likes}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
