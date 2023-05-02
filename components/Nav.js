import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/shopContext";
import MiniCart from "./MiniCart";
import Image from "next/image";
import CollapsedMenu from "./collapsedMenu";
import { SearchIcon } from "@heroicons/react/outline";
import { getMenuItems, searchProducts } from "../lib/shopify";
import DropDownComponent from "./DropdownComponent";

export default function Nav() {
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const [menuItems, setMenuItems] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const searchToggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (index) => {
    setIsMenuOpen((prevState) => {
      const newIsMenuOpen = {};
      for (let i = 0; i < menuItems.length; i++) {
        newIsMenuOpen[i] = i === index ? !prevState[i] : false;
      }
      return newIsMenuOpen;
    });
  };

  useEffect(async () => {
    const menuItem = await getMenuItems();
    setMenuItems(menuItem);
  }, []);

  const { cart, cartOpen, setCartOpen } = useContext(CartContext);
  let cartQuantity = 0;

  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity);
  });

  const myLoader = ({ src, width, quality }) => {
    return `https://cdn.shopify.com/s/files/1/0275/5883/8385/files/POWRBOX_BOXING__established_2019w_900655ca-6318-4c55-883b-1688d63498ec.png?v=1667115838`;
  };

  useEffect(() => {
    // add event listeners
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", handleClickOutside);

    return () => {
      // remove event listeners
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleEscapeKey(event) {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  function handleClickOutside(event) {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const dropdownMenu = dropdownRef.current;
      if (dropdownMenu && !dropdownMenu.contains(event.target)) {
        // user clicked outside of the dropdown menu, close it
        setIsMenuOpen((prevState) => {
          const newIsMenuOpen = {};
          for (let i = 0; i < menuItems.length; i++) {
            newIsMenuOpen[i] = false;
          }
          return newIsMenuOpen;
        });
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen((prevState) => {
          const newIsMenuOpen = {};
          for (let i = 0; i < menuItems.length; i++) {
            newIsMenuOpen[i] = false;
          }
          return newIsMenuOpen;
        });
      }
    };

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuItems]);

  return (
    <header className="sticky top-0 z-20 bg-black text-white font-pirate">
      <div className="flex items-center justify-between p-4 border-b-2 border-red-500">
        <Link href="/">
          <Image
            loader={myLoader}
            src="logo.png"
            alt="Logo"
            width={160}
            height={80}
            className="cursor-pointer"
          />
        </Link>

        <div
          ref={searchRef}
          className="w-1/3 absolute md:relative right-32 md:right-0 text-white hover:text-gray-900 border-red-500 border-2 px-2 py-1 "
        >
          <input
            type="text"
            name="search"
            className="w-full text-white bg-black focus:outline-none"
            placeholder="Search"
            onClick={searchToggle}
            onChange={async (event) => {
              const searchResult = await searchProducts(event.target.value);
              setSearchResult(searchResult);
            }}
          />
          <button type="button" className="absolute right-2 inset-y-0">
            <SearchIcon className="w-6 h-6" />
          </button>

          {searchResult.length == 0 ? (
            <div
              className={`${
                isOpen ? "flex" : "hidden"
              } w-full h-20 bg-black text-white border-2 border-red-500 rounded-b-2xl absolute top-8 right-0 flex flex-col justify-center`}
            >
              <p className="font-bold items-center justify-center text-center">
                No results
              </p>
            </div>
          ) : (
            <div
              className={`${
                isOpen ? "flex" : "hidden"
              } w-full h-96 bg-black text-white border-2 gap-1 border-red-500 rounded-b-2xl absolute top-8 right-0 flex flex-col overflow-auto`}
            >
              {searchResult.map((data) => (
                <Link href={`/products/${data?.node?.handle}`}>
                  <div
                    className="flex flex-row items-center cursor-pointer bg-black hover:bg-gray-900"
                    key={data?.node?.id}
                    onClick={searchToggle}
                  >
                    <Image
                      src={data?.node?.images?.edges[0]?.node?.url}
                      alt="image"
                      layout="intrinsic"
                      width={100}
                      height={100}
                      objectFit="contain"
                    />
                    <div className="flex flex-col">
                      <div>{data?.node?.title}</div>
                      <div className="font-medium">
                        ${data?.node?.priceRange?.minVariantPrice?.amount}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <CollapsedMenu menuItems={menuItems} />

        <a
          className="text-md font-bold cursor-pointer flex text-white"
          onClick={() => setCartOpen(!cartOpen)}
        >
          Cart ({cartQuantity})
        </a>
        <MiniCart cart={cart} />
      </div>

      <div
        className="hidden md:flex items-center justify-center gap-10 p-4 border-b-2 border-black"
        ref={dropdownRef}
      >
        {menuItems.map((item, index) => (
          <div>
            <span
              key={item.id}
              className="flex flex-row cursor-pointer"
              onClick={() => toggleDropdown(index)}
            >
              {item.title}
              <svg
                className="w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            {isMenuOpen[index] && (
              <div className="absolute z-50 w-fit mt-4 bg-white rounded-lg shadow-lg">
                <DropDownComponent subMenu={item.items} />
              </div>
            )}
          </div>
        ))}
      </div>
    </header>
  );
}
