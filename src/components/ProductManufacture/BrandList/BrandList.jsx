import React from "react";

const BrandList = ({ brands, selectedSubCat, setSelectedSubCat }) => {
    return (
        <div>
            <div className="flex justify-center items-center">
                <h1 className="text-2xl text-violet-700 font-bold mb-6">Brand Name</h1>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 px-2 scrollbar-hide">
            {brands.map((band) => (
                <div
                    key={band.id}
                    onClick={() =>
                        setSelectedSubCat(selectedSubCat === band.name ? null : band.name)
                    }
                    className="min-w-[120px] cursor-pointer flex-shrink-0 text-center hover:scale-105 transition-transform"
                >

                    <img src={band.image}
                        alt={band.name}
                        className="w-24 h-24 mx-auto rounded-full shadow-md object-cover" />
                    <p className="mt-2 font-medium">{band.name}</p>
                </div>
            ))}
        </div>
        </div>
    );
};

export default BrandList;
