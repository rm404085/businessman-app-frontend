import { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [postText, setPostText] = useState("");
  const [mediaPreview, setMediaPreview] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  // handle image/video upload
  const handleMedia = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setMediaPreview((prev) => [...prev, ...previews]);
  };

  // main post function
const handlePost = () => {
  if (!postText.trim() && mediaPreview.length === 0) return;

  // ✅ Check if uploaded file(s) are video type
  const isVideo = mediaPreview.some((src) =>
    src.match(/\.(mp4|mov|avi|mkv)$/)
  );

  const newPost = {
    id: Date.now(),
    type: isVideo ? "video" : "post", // ✅ auto detect type
    text: postText,
    media: mediaPreview,
    customer: {
      name: "Guest User",
      photo: "https://i.pravatar.cc/150?u=guest",
    },
    date: new Date().toLocaleString(),
  };

  // ✅ Add to global list
  setAllPosts((prev) => [newPost, ...prev]);

  // reset form
  setPostText("");
  setMediaPreview([]);
};


  return (
    <PostContext.Provider
      value={{
        postText,
        setPostText,
        mediaPreview,
        setMediaPreview,
        handleMedia,
        handlePost,
        allPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
