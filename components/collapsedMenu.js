import "hamburgers/dist/hamburgers.min.css";
import React, { useState } from "react";

const collapsedMenu = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(
    new Array(menuItems.length).fill(false)
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (index) => {
    setIsMenuOpen((prevState) => {
      const newIsMenuOpen = [...prevState];
      newIsMenuOpen[index] = !newIsMenuOpen[index];
      return newIsMenuOpen;
    });
  };

  return (
    <nav className="flex md:hidden absolute right-16 z-10">
      <button
        className={`hamburger hamburger--elastic ${isOpen ? "is-active" : ""}`}
        type="button"
        aria-label="Menu"
        aria-controls="navigation"
        onClick={toggleMenu}
      >
        <span className="hamburger-box transform scale-50">
          <span className="hamburger-inner"></span>
        </span>

        <div
          className={`${isOpen ? "flex" : "hidden"} absolute bg-black flex-col`}
        >
          {menuItems?.map((item, index) => (
            <div key={item.title}>
              <span
                className="text-white font-medium py-2"
                onClick={() => toggleDropdown(index)}
              >
                {item.title}
              </span>
              <div className="flex flex-col border-2 rounded border-red-600">
                {isMenuOpen[index] &&
                  item.items.map((subItem) => (
                    <a
                      key={subItem.title}
                      className="text-gray-200 py-2 text-sm hover:text-blue-500"
                    >
                      {subItem.title}
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </button>
    </nav>
  );
};

export default collapsedMenu;
