import React, { useEffect, useState } from "react";
import { getFeaturedProducts } from "../lib/shopify";
import { Bars } from "react-loader-spinner";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(async () => {
    const featuredProduct = await getFeaturedProducts();
    setFeaturedProducts(featuredProduct);
  }, []);

  return (
    <div className="max-w-2xl mx-auto pt-16 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
      {featuredProducts.length == 0 ? (
        <div className="absolute left-1/2">
          <Bars
            height="80"
            width="80"
            color="white"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className="font-semibold text-2xl md:text-4xl mb-6">
            Featured Products
          </div>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedProducts;
