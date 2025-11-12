import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";

const ProductCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/productPhoto.json")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = Object.values(data.products).flat();
        const found = allProducts.find((item) => item.id === id);

        if (found) {
          const variations = found.images || [
            found.image,
            `${found.image}&tint=red`,
            `${found.image}&tint=blue`,
            `${found.image}&tint=green`,
          ];
          found.gallery = variations;
          setProduct(found);
          setSelectedImage(variations[0]);
        }
      });
  }, [id]);

  const handleAddToCart = () => {
    alert(`${quantity} × ${product.productName} added to cart!`);
  };

  if (!product) return <p className="p-5 text-center">Loading...</p>;

  const discountPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : null;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow rounded-lg  md:p-6">
        {/* Image Section */}
        <div className="flex-1">
          <div className="relative overflow-hidden rounded-lg border mb-4">
            <img
              src={selectedImage}
              alt={product.productName}
              className="w-full h-72 object-cover transition-transform duration-300 hover:scale-105 hover:brightness-90"
            />
            <button
              onClick={() => setWishlist(!wishlist)}
              className={`absolute top-3 right-3 p-2 rounded-full ${
                wishlist ? "bg-red-500 text-white" : "bg-white text-gray-700"
              } shadow-md`}
            >
              <FaHeart />
            </button>
          </div>

          {/* Gallery Thumbnails */}
          <div className="flex gap-3 justify-center flex-wrap">
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

          {/* Ratings */}
          <div className="flex items-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`${
                  i < (product.rating || 4)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600">
              ({product.reviews || 125} reviews)
            </span>
          </div>

          {/* Price + Discount */}
          <p className="text-gray-600 text-lg font-medium">
            {discountPrice ? (
              <>
                <span className="text-2xl font-bold text-violet-700">
                  ${discountPrice}
                </span>
                <span className="line-through text-gray-400 ml-2">
                  ${product.price}
                </span>
                <span className="ml-2 text-green-600 font-semibold">
                  -{product.discount}%
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">${product.price}</span>
            )}
          </p>
          <p>Location:</p>

          <p className="text-sm text-gray-500 mt-2">
            {product.stock > 0 ? (
              <span className="text-green-600">✔ In Stock</span>
            ) : (
              <span className="text-red-600">✖ Out of Stock</span>
            )}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            SKU: <span className="font-medium">{product.sku || "N/A"}</span>
          </p>

          <p className="text-sm text-gray-500 mt-1 mb-4">
            Estimated Delivery:{" "}
            <span className="font-medium">3–5 business days</span>
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description ||
              "This is a premium quality product built for performance and style."}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mb-5">
            <label htmlFor="quantity" className="font-medium text-gray-600">
              Quantity:
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {[1, 2, 3, 4, 5, 10].map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="px-5 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition"
            >
              Add to Cart
            </button>
            <button className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Customer Review Section */}
      <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3 text-violet-700">
          Customer Feedback
        </h3>
        <p className="text-gray-700 text-sm">
          ★★★★★ “Excellent quality and fast delivery. Totally worth the price!”
        </p>
        <p className="text-gray-500 text-xs mt-2">
          – From Verified Buyer, 2 days ago
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
