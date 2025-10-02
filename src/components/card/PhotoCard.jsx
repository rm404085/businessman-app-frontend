// components/card/PhotoCard.jsx
import { FaHeart, FaRegHeart, FaCommentAlt, FaShare } from "react-icons/fa";
import { useState } from "react";

const PhotoCard = ({ post }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Image */}
      <img
        src={post.image}
        alt={post.text}
        className="w-full h-96 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        {/* User info */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{post.user.name}</p>
            <span className="text-sm text-gray-500">{post.time}</span>
          </div>
        </div>

        {/* Text */}
        {post.text && (
          <p className="text-gray-700 mb-3 line-clamp-2">{post.text}</p>
        )}

        {/* Actions */}
        <div className="flex justify-between text-gray-600 text-sm border-t pt-2">
          <button
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-1 hover:text-red-500"
          >
            {liked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
            {liked ? post.likes + 1 : post.likes}
          </button>
          <button className="flex items-center gap-1 hover:text-blue-500">
            <FaCommentAlt /> {post.comments}
          </button>
          <button className="flex items-center gap-1 hover:text-green-500">
            <FaShare /> {post.shares}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
