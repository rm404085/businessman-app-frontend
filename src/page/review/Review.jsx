import ReviewCard from "@/components/card/ReviewCard";
import { usePostContext } from "@/components/Provider/PostProvider/PostProvider";
import { useEffect, useState } from "react";

const Review = () => {
  const { allPosts } = usePostContext();
  const [reviews, setReviews] = useState([]);

  // ✅ fetch static review.json
  useEffect(() => {
    fetch("/review.json")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  // ✅ Normalize mixed media formats
  const normalizeMedia = (media) => {
    if (!media) return [];
    return media.map((item) =>
      typeof item === "string"
        ? { url: item, type: item.includes(".mp4") ? "video" : "image" }
        : item
    );
  };

  // ✅ Merge posts + static reviews (normalized)
  const combinedReviews = [...allPosts, ...reviews].map((r) => ({
    ...r,
    media: normalizeMedia(r.media),
  }));

  return (
    <div className="grid gap-5 mt-16 grid-cols-1 lg:m-4 lg:gap-2  lg:grid-cols-2">
      {combinedReviews.length > 0 ? (
        combinedReviews.map((review, idx) => (
          <ReviewCard
            key={review.id || idx}
            review={review}
            companyName={review.companyName}
          />
        ))
      ) : (
        <p className="text-center text-gray-400 col-span-full mt-10">
          No reviews yet.
        </p>
      )}
    </div>
  );
};

export default Review;
