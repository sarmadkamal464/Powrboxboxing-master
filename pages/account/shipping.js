import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { formatter } from "../../utils/helpers";
import Client from "shopify-buy";

const client = Client.buildClient({
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
  domain: process.env.SHOPIFY_STORE_DOMAIN,
});

const shipping = () => {
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("standard");
  const [selectedPrice, setSelectedPrice] = useState(14.99);
  const first = productData[0];
  const [prices, setPrices] = useState([]);
  const [checkoutId, setCheckoutId] = useState("");
  const [lineItemsToAdd, setLineItemsToAdd] = useState([]);
  const [checkoutURL, setCheckoutURL] = useState("");

  useEffect(() => {
    const lineItems = first?.map((item) => {
      return {
        variantId: item.id,
        quantity: item.variantQuantity,
      };
    });
    setLineItemsToAdd(lineItems);
  }, [first]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "standard") {
      setSelectedPrice(14.99);
    } else if (event.target.value === "express") {
      setSelectedPrice(19.99);
    }
  };

  useEffect(() => {
    let price = first?.map((item) => {
      return item.variantQuantity * item.variantPrice;
    });
    setPrices(price);
  }, [first]);

  const getTotal = (prices = []) => {
    return prices.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  };

  useEffect(() => {
    client.checkout.create().then((checkout) => {
      setCheckoutId(checkout.id);
    });
  }, []);

  const {
    address,
    apt,
    city,
    company,
    country,
    firstName,
    lastName,
    phoneNumber,
    postalCode,
    ...rest
  } = userData;

  const shippingAddress = {
    address1: apt,
    address2: address,
    city: city,
    company: null,
    country: country,
    firstName: firstName,
    lastName: lastName,
    phone: phoneNumber,
    zip: postalCode,
  };

  if (checkoutId && shippingAddress) {
    client.checkout
      .addLineItems(checkoutId, lineItemsToAdd)
      .then((checkout) => {
        setCheckoutURL(checkout?.webUrl);
      });

    client.checkout
      .updateShippingAddress(checkoutId, shippingAddress)
      .then((checkout) => {
        setCheckoutURL(checkout?.webUrl);
      });
  } else {
    console.log("checkoutId is empty or null");
  }

  useEffect(async () => {
    const userDataFromStorage = await JSON.parse(
      localStorage.getItem("userData")
    );
    const productDataFromStorage = JSON.parse(
      localStorage.getItem("checkout_id")
    );
    setUserData(userDataFromStorage);
    setProductData(productDataFromStorage);
  }, []);

  return (
    <>
      <Head>
        <title>Calculate Shipping</title>
      </Head>
      <div className="flex flex-col mx-auto w-full container px-3 sm:px-6 md:flex-row justify-center">
        <div className="flex flex-col">
          <div className="text-gray-400 font-medium text-xl py-5">
            Shipping Details
          </div>
          <div className="w-full h-full bg-white text-black rounded-xl mb-2">
            <div className="flex flex-row">
              <span className="text-gray-400 font-medium p-3">Contact</span>
              <span className="p-3">{userData?.email}</span>
              <Link href="/account/register">
                <span className="underline text-gray-400 hover:text-gray-600 ml-auto p-3 cursor-pointer">
                  Change
                </span>
              </Link>
            </div>

            <div className="flex flex-row">
              <span className="text-gray-400 font-medium p-3">Ship to</span>
              <span className="p-3">
                {userData?.apt} {userData?.address} {userData?.city}{" "}
                {userData?.postalCode} {userData?.country}
              </span>
              <Link href="/account/register">
                <span className="underline text-gray-400 hover:text-gray-600 ml-auto p-3 cursor-pointer">
                  Change
                </span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col container pt-5">
            <span className="justify-start items-start text-white text-left py-5">
              Shipping Method
            </span>
            <div className="w-full h-full bg-white text-black rounded-xl mb-5">
              <div className="flex flex-col p-3">
                <label className="flex flex-row p-2">
                  <input
                    type="radio"
                    name="standard"
                    value="standard"
                    checked={selectedOption === "standard"}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  Standard
                  <span className="underline text-gray-400 hover:text-gray-600 ml-auto cursor-pointer">
                    {formatter.format(14.99)}
                  </span>
                </label>
                <label className="flex flex-row p-2">
                  <input
                    type="radio"
                    name="express"
                    value="express"
                    checked={selectedOption === "express"}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  Express
                  <span className="underline text-gray-400 hover:text-gray-600 ml-auto cursor-pointer">
                    {formatter.format(19.99)}
                  </span>
                </label>
              </div>
            </div>
            <a href={checkoutURL} className="ml-auto">
              <button className="text-white bg-gray-600 hover:bg-gray-700 p-5 rounded cursor-pointer mb-10">
                Checkout
              </button>
            </a>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <div className="p-5">
            <span className="font-bold text-xl">Cart</span>
            {first?.map((item) => {
              return (
                <div className="flex flex-row items-center">
                  <img
                    src={item.image}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                  <div className="flex flex-col pl-4">
                    <span className="items-center">{item?.title}</span>
                    <span className="items-center">{item?.variantTitle}</span>
                    <span className="items-center">
                      QTY:{item?.variantQuantity}
                    </span>
                  </div>
                  <span className="items-center ml-auto">
                    {formatter.format(
                      item?.variantQuantity * item?.variantPrice
                    )}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="p-5 flex flex-col">
            <div className="flex flex-row text-sm">
              <span>Subtotal</span>
              <span className="ml-auto">
                {formatter.format(getTotal(prices))}
              </span>
            </div>
            <div className="flex flex-row">
              <span>Shipping</span>
              <span className="ml-auto">{formatter.format(selectedPrice)}</span>
            </div>
            <div className="flex flex-row text-lg">
              <span>Total</span>
              <span className="ml-auto underline">
                {formatter.format(selectedPrice + getTotal(prices))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default shipping;
