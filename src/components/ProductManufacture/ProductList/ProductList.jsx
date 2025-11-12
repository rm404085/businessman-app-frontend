import React from "react";
import { useNavigate } from "react-router";

const ProductList = ({ products }) => {

  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="space-y-4">
      
      {products.map((prod) => (
        <div
          key={prod.id}
          className="flex items-center md:grid md:grid-cols-2 md:gap-6 border rounded-lg p-3 shadow hover:shadow-lg transition"
          onClick={()=> navigate(`/manufacture/productsPhoto/${prod.id}`)}
        >
          <img
            src={prod.image}
            alt={prod.productName}
            className="w-36 h-40 object-cover rounded mr-4 flex-shrink-0"
          />
          <div className="flex flex-col">
            <p className="font-medium text-lg">{prod.productName}</p>
            <p className="text-sm  text-gray-500">{prod.description}</p>
            <p className="text-sm text-gray-600 mt-1">${prod.price}</p>
             <button
              
              className="px-3 py-1 bg-yellow-500 text-white rounded-3xl hover:bg-violet-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
