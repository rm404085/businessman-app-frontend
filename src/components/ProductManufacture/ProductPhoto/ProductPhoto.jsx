import { useEffect, useState } from "react";
import MainCategoryList from "../MainCategoryList/MainCategoryList";
import BrandList from "../BrandList/BrandList";
import ProductList from "../ProductList/ProductList";
import { useNavigate } from "react-router";
import SearchBar from "@/components/ui/SearchBar";

const ProductPhoto = () => {

    const [data, setData] = useState(null);
    const [selectedMainCat, setSelectedMainCat] = useState(null);
    const [selectedSubCat, setSelectedSubCat] = useState(null);
    const navigate = useNavigate()

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
         <div className="mt-2">
            <SearchBar></SearchBar>
         </div>
         <div>
            
            {
                !selectedMainCat && (
                    <div>
                        <MainCategoryList
                            data={data} setSelectedMainCat={setSelectedMainCat}
                        ></MainCategoryList>

                        <div className="mt-10 space-y-10">
            {data.mainCategories.map((cat) => (
              <div key={cat.id}>
                <h3 className="text-xl font-semibold mb-3 text-violet-700">
                  {cat.name} Products
                </h3>
                <ProductList products={getAllProductsForCategory(cat.name)} />
              </div>
            ))}
          </div>
                    </div>
                )
            }

            {
                selectedMainCat && (
                    
                    <div>
                         <button
            onClick={() => {
              setSelectedMainCat(null);
              setSelectedSubCat(null);
            }}
            className="mb-4 px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            ← Back to Categories
          </button>
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
       </div>
    )
}

export default ProductPhoto;