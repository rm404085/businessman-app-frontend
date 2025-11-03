import { useEffect, useState } from "react";
import MainCategoryList from "../MainCategoryList/MainCategoryList";
import BrandList from "../BrandList/BrandList";
import ProductList from "../ProductList/ProductList";

const ProductPhoto = () => {

    const [data, setData] = useState(null);
    const [selectedMainCat, setSelectedMainCat] = useState(null);
    const [selectedSubCat, setSelectedSubCat] = useState(null);

    useEffect(() => {
        fetch("/productPhoto.json")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);
    // console.log(data)
    if (!data) return <p>Loading.....</p>

    const getAllProductsForCategory = (category) => {
    const brands = data.subCategories[category] || [];
    let allProducts = [];
    brands.forEach((b) => {
      if (data.products[b.name]) {
        allProducts = [...allProducts, ...data.products[b.name]];
      }
    });
    return allProducts;
  };

    return (
        <div>
            {
                !selectedMainCat && (
                    <div>
                        <MainCategoryList
                            data={data} setSelectedMainCat={setSelectedMainCat}
                        ></MainCategoryList>
                    </div>
                )
            }

            {
                selectedMainCat && (
                    <div>
                        <BrandList
                            brands={data.subCategories[selectedMainCat]} // <-- এখানে থেকে এসেছে brands prop
                            selectedSubCat={selectedSubCat}
                            setSelectedSubCat={setSelectedSubCat}
                        >
                        </BrandList>

                        <h3 className="text-lg font-semibold mb-3">
                            {selectedSubCat
                                ? `Products under ${selectedSubCat}`
                                : `All Products for ${selectedMainCat}`}
                        </h3>

                        <ProductList
                            products={
                                selectedSubCat
                                    ? data.products[selectedSubCat]
                                    : getAllProductsForCategory(selectedMainCat)
                            }
                        />
                    </div>
                )
            }


        </div>
    )
}

export default ProductPhoto;