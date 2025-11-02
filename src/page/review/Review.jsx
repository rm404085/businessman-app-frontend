import ReviewCard from "@/components/card/ReviewCard";
import { usePostContext } from "@/components/Provider/PostProvider/PostProvider";
import { useEffect, useState } from "react";

const Review = () => {
  const { allPosts } = usePostContext(); // from context
  const [reviews, setReviews] = useState([]); // fetched from JSON

  // ✅ Fetch initial reviews from local JSON
  useEffect(() => {
    fetch("/review.json")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  // ✅ Normalize context posts to match review.json structure
  const normalizedPosts = allPosts.map((post) => ({
    id: post.id || Date.now(),
    type: post.type || "post",
    customer: {
      name: post.name || "Anonymous",
      photo: post.photo || "https://via.placeholder.com/150",
    },
    review: {
      title: post.title || "",
      content: post.content || "",
      date: new Date().toISOString().split("T")[0],
    },
    src: post.type === "video" ? post.media : null,
    photos: post.type === "post" ? [post.media] : [],
  }));

  // ✅ Combine normalized posts + static reviews
  const combinedReviews = [...normalizedPosts, ...reviews];

  return (
    <div className="grid gap-5 grid-cols-1 lg:m-4 lg:gap-2 mt-4 lg:grid-cols-2">
      {combinedReviews.length > 0 ? (
        combinedReviews.map((review, idx) => (
          <ReviewCard key={review.id || idx} review={review} />
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
