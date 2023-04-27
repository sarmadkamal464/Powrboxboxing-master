import React, { useState, useMemo, useEffect, createContext } from "react";
import Head from "next/head";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useFormik } from "formik";
import { validateSignup } from "../../lib/validate";
import Link from "next/link";

const register = () => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    formik.setFieldValue("country", value.label);
    setValue(value);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      address: "",
      apt: "",
      city: "",
      postalCode: "",
      phoneNumber: "",
    },
    validate: validateSignup,
    onSubmit: () => {
      console.log("working");
    },
  });

  const handleCountryChange = (value) => {
    formik.setFieldValue("country", value.label);
    setValue(value);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "black",
      color: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#d4af37" : "white",
      color: state.isFocused ? "black" : "black",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transform: state.isFocused ? "rotate(180deg)" : "rotate(0deg)",
    }),
  };

  const submitData = () => {
    localStorage.setItem("userData", JSON.stringify(formik.values));
    const userDataString = localStorage.getItem("userData");
    const userData1 = JSON.parse(userDataString);
    console.log("userData1", userData1);
  };

  console.log(formik.values);

  return (
    <>
      <Head>
        <title>Register yourself</title>
      </Head>
      <div className="flex flex-col mx-auto w-1/2 container px-4 sm:px-6 items-center ">
        {/* <div className="text-gray-400 font-medium text-xl py-5">
          Express Checkout
        </div>
        <div className="flex flex-row text-center w-3/4 justify-between mb-5">
          <div className="w-40 rounded-xl h-10 bg-golden text-black">
            Shop-Pay
          </div>
          <div className="w-40 rounded-xl h-10 bg-golden text-black">G-Pay</div>
        </div>
        <span className="text-gray-400 py-3">OR</span> */}
        <p className="text-gray-400 py-5 text-xl">Shipping Details</p>

        <form
          className="justify-start flex flex-col pb-10 gap-6 w-full z-10"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="firstname" className="mb-2">
              First Name
            </label>
            <input
              className="border-2 border-red-500 hover:shadow-2xl z-10 bg-black text-white p-2 rounded-xl"
              type="text"
              id="firstname"
              placeholder="First Name"
              {...formik.getFieldProps("firstName")}
            />
            {formik.errors.firstName && formik.touched.firstName && (
              <span className="text-sm mt-2 text-red-500">
                {formik.errors.firstName}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastname" className="mb-2">
              Last Name
            </label>
            <input
              className="border-2 border-red-500 hover:shadow-2xl z-10 bg-black text-white p-2 rounded-xl"
              type="text"
              id="lastname"
              placeholder="Last Name"
              {...formik.getFieldProps("lastName")}
            />
            {formik.errors.lastName && formik.touched.lastName && (
              <span className="text-sm mt-2 text-red-500">
                {formik.errors.lastName}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              className="border-2 border-red-500 hover:shadow-2xl z-10 bg-black text-white p-2 rounded-xl"
              type="email"
              id="email"
              placeholder="Email Address"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email && (
              <span className="text-sm mt-2 text-red-500">
                {formik.errors.email}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="mb-2">
              Address
            </label>
            <input
              className="border-2 border-red-500 hover:shadow-2xl z-10 bg-black text-white p-2 rounded-xl"
              type="text"
              id="address"
              placeholder="Address"
              {...formik.getFieldProps("address")}
            />
            {formik.errors.address && formik.touched.address && (
              <span className="text-sm mt-2 text-red-500">
                {formik.errors.address}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="apt" className="mb-2">
              Apt
            </label>
            <input
              className="border-2 border-red-500 hover:shadow-2xl z-10 bg-black text-white p-2 rounded-xl"
              type="text"
              id="apt"
              placeholder="Apt"
              {...formik.getFieldProps("apt")}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="city" className="mb-2">
              City
            </label>
            <input
              className="border-2 border-red-500 hover:shadow-2xl z-10 bg-black text-white p-2 rounded-xl"
              type="text"
              id="city"
              placeholder="City"
              {...formik.getFieldProps("city")}
            />
            {formik.errors.city && formik.touched.city && (
              <span className="text-sm mt-2 text-red-500">
                {formik.errors.city}
              </span>
            )}
          </div>

          <Select
            options={options}
            value={value}
            onChange={changeHandler}
            styles={customStyles}
            id="country"
            className="z-50 border-2 border-red-500 hover:border-transparent text-white"
          />

          <div className="flex flex-col">
            <label htmlFor="postalCode" className="mb-2">
              Postal Code
            </label>
            <input
              className="border-2 border-red-500 hover:shadow-2xl z-10 bg-black text-white p-2 rounded-xl"
              type="text"
              id="postalCode"
              placeholder="Postal Code"
              {...formik.getFieldProps("postalCode")}
            />
            {formik.errors.postalCode && formik.touched.postalCode && (
              <span className="text-sm mt-2 text-red-500">
                {formik.errors.postalCode}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="postalCode" className="mb-2">
              Phone Number
            </label>
            <input
              className="border-2 border-red-500 hover:shadow-2xl z-10 bg-black text-white p-2 rounded-xl"
              type="text"
              id="phoneNumber"
              placeholder="Phone Number"
              {...formik.getFieldProps("phoneNumber")}
            />
          </div>
          <Link href="/account/shipping">
            <button
              type="submit"
              className="bg-red-500 p-3 rounded-xl text-black font-bold mb-10"
              onClick={submitData}
            >
              Continue to Shipping
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default register;
