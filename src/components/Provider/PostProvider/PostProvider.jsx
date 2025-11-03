import { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [postText, setPostText] = useState("");
  const [mediaPreview, setMediaPreview] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

 // PostProvider.jsx এর ভিতরে
const handleMedia = (e) => {
  const files = Array.from(e.target.files);
  if (!files || files.length === 0) return;

  const previews = files.map((file) => {
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith("video") ? "video" : "image";
    return { url, type, file };
  });

  // ✅ আগের preview রাখার পাশাপাশি নতুন গুলো যোগ
  setMediaPreview((prev) => [...prev, ...previews]);

  // ✅ input reset করে দাও, যাতে পরেরবার আবার same file select করা যায়
  e.target.value = "";
};


 const handlePost = ({ companyName, rating }) => {
  if (!postText.trim() && mediaPreview.length === 0) return;

  const newPost = {
    id: Date.now(),
    text: postText,
    media: mediaPreview, // [{url, type}]
    rating: rating || 0, // ⭐ user-এর দেওয়া rating সংরক্ষণ
    customer: {
      name: "Guest User",
      photo: "https://i.pravatar.cc/150?u=guest",
    },
    date: new Date().toLocaleString(),
    companyName: companyName || "Unknown Company",
  };

  setAllPosts((prev) => [newPost, ...prev]);
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
