import React, { useState, useEffect } from "react";
import { getProductsInCollection } from "../../lib/shopify";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard";
import { Bars } from "react-loader-spinner";
import Head from "next/head";

export default function collection() {
  const router = useRouter();
  const { collections } = router.query;
  const tile = router.query.collections;
  const titleCaseText =
    tile?.charAt(0).toUpperCase() + tile?.slice(1).replace(/-/g, " ");

  const [value, setValue] = useState("COLLECTION_DEFAULT");
  const [reverse, setReverse] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { value: "PRICE", label: "Price - High to Low", reverse: true },
    { value: "PRICE", label: "Price - Low to High", reverse: false },
    { value: "BEST_SELLING", label: "Best Selling", reverse: false },
    { value: "TITLE", label: "Sort A-Z", reverse: false },
    { value: "TITLE", label: "Sort Z-A", reverse: true },
  ];

  const handleFilterChange = (e) => {
    const { value, reverse } = options.find(
      (option) => option.label === e.target.value
    );
    setSelectedOption(e.target.value);
    setValue(value);
    setReverse(reverse);
  };

  useEffect(() => {
    async function fetchData() {
      const product = await getProductsInCollection(
        collections,
        value,
        reverse
      );
      setProducts(product);
    }
    fetchData();
  }, [value, reverse]);

  return (
    <>
      <Head>
        <title>{titleCaseText}</title>
      </Head>
      <div className="max-w-2xl mx-auto pt-16 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8 items-center justify-center">
        {products?.length == 0 ? (
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
          <div>
            <div className="mt-5 text-xl font-bold">FILTER BY</div>
            <div>
              <select
                className="mb-10 p-3 text-white bg-black border-2 border-red-500"
                value={selectedOption}
                onChange={handleFilterChange}
              >
                <option value="">Select a filter</option>
                {options.map((option, index) => (
                  <option key={index} value={option.label}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <ProductCard key={product?.node?.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
