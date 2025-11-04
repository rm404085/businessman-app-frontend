import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/productPhoto.json")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = Object.values(data.products).flat();
        const found = allProducts.find((item) => item.id === id);

        if (found) {
          // dummy color/image variations যোগ করা
          const variations = [
            found.image,
            `${found.image}&tint=red`,
            `${found.image}&tint=blue`,
            `${found.image}&tint=green`,
          ];
          found.gallery = variations;
          setProduct(found);
          setSelectedImage(found.image);
        }
      });
  }, [id]);

  if (!product) return <p className="p-5 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-8 bg-white  shadow rounded-lg">
        {/* Image Section */}
        <div className="flex-1">
          <div className="overflow-hidden rounded-lg border mb-4">
            <img
              src={selectedImage}
              alt={product.productName}
              className="w-full h-72 object-cover transition-transform duration-300 hover:scale-105 hover:brightness-90"
            />
          </div>

          {/* 🖼️ Gallery Thumbnails */}
          <div className="flex gap-3 justify-center">
            {product.gallery?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Variant ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 transition-all ${
                  selectedImage === img
                    ? "border-violet-600 scale-105"
                    : "border-transparent hover:border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2 text-violet-700">
            {product.productName}
          </h2>
          <p className="text-gray-600 mb-2 text-lg font-medium">
            ${product.price}
          </p>
          {product.brand && (
            <p className="text-sm text-gray-500 mb-1">
              Brand: <span className="font-medium">{product.brand}</span>
            </p>
          )}
          {product.category && (
            <p className="text-sm text-gray-500 mb-3">
              Category: <span className="font-medium">{product.category}</span>
            </p>
          )}
          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description ||
              "This is a premium quality product built for performance and style."}
          </p>
          <button className="px-5 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
