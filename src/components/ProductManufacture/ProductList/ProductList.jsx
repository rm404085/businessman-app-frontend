import React from "react";

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="space-y-4">
      {products.map((prod) => (
        <div
          key={prod.id}
          className="flex items-center border rounded-lg p-3 shadow hover:shadow-lg transition"
        >
          <img
            src={prod.image}
            alt={prod.productName}
            className="w-36 h-36 object-cover rounded mr-4 flex-shrink-0"
          />
          <div className="flex flex-col">
            <p className="font-medium text-lg">{prod.productName}</p>
            <p className="text-sm text-gray-600 mt-1">${prod.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
