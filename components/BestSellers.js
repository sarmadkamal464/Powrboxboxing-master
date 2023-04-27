import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import ProductCard from "./ProductCard";
import Link from "next/link";

const BestSeller = ({ bestSellers }) => {
  const [bestSeller, setBestSellers] = useState([]);

  useEffect(() => {
    setBestSellers(bestSellers?.products?.edges);
  }, []);

  return (
    <div className="max-w-2xl mx-auto pt-16 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
      {bestSellers?.length == 0 ? (
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
          <div className="font-semibold text-2xl md:text-4xl mb-6 flex flex-row">
            <span>{bestSellers?.title}</span>
            <Link
              href={`/collections/${bestSellers.handle}`}
              key={bestSellers.handle}
            >
              <button className="p-2 bg-red-500 hover:bg-red-700 flex flex-row ml-auto text-sm">
                Explore
                <div className="justify-center items-center ml-3 font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </div>
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {bestSeller?.slice(0, 4).map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BestSeller;
