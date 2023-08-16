import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../../Store/Slices/userDataSlices";
import { addUserData } from "../../Store/Slices/userDataSlices";
import { CircularProgress } from "@mui/material";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import ProductForm from "../CreateProduct/CreateProduct";
import SellerProductSection from "./SellerProductSection";
import SellerOrdersSection from "./SellerOrdersSection";
import axios from "axios";

const SellerProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showProducts, setShowProducts] = useState(true);
  const [showPersonalData, setShowPersonalData] = useState(false);
  const [ordersData, setOrdersData] = useState([]);

  const [createProductBar, setCreateProductBar] = useState(false);
  const userData = useSelector((state) => state.userData.personalData);

  const signOutHandler = () => {
    dispatch(removeUserData);
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const showOrdersHandler = () => {
    setShowOrders(true);
    setShowPersonalData(false);
    setShowProducts(false);
  };
  const showProductsHandler = () => {
    setShowOrders(false);
    setShowPersonalData(false);
    setShowProducts(true);
  };
  const showPersonalDataHandler = () => {
    setShowOrders(false);
    setShowPersonalData(true);
    setShowProducts(false);
  };

  const setUserData = (payload) => {
    dispatch(addUserData(payload));
  };

  useEffect(() => {
    // setToken(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/seller/userdata", {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    axios
      .get("/purchaser/orders", {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setOrdersData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.message);
        setIsLoading(false);
      });
  }, []);
  return (
    <div>
      <div className="min-h-screen  ">
        <div className="flex flex-row items-end space-x-2 px-[2rem] pt-[2rem]">
          <div
            className="mb-[6px] text-gray-500 hover:text-black hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            <IoChevronBackSharp size={30} />
          </div>
          <h1 className="text-[22px] pb-[5px]">Welcome </h1>{" "}
          <h1 className="text-[32px]">{userData.username}</h1>
        </div>
        <div className="flex justify-end shadow-xl">
          <div className="flex grow border-b-2 border-black"></div>
          <button
            className={`py-[0.5rem]  border-black border-b-2`}
            onClick={() => signOutHandler()}
          >
            Sign out
          </button>
          <button
            className={`py-[0.5rem] px-[2rem] border-black border-b-2`}
            onClick={() => setCreateProductBar(true)}
          >
            Add Product
          </button>
          <button
            className={`py-[0.5rem] px-[2rem] border-black ${
              showProducts ? "border-t-2 border-r-2 border-l-2" : "border-b-2"
            }`}
            onClick={() => showProductsHandler()}
          >
            Products
          </button>
          <button
            className={`py-[0.5rem] px-[2rem] border-black r ${
              showOrders ? "border-t-2 border-r-2 border-l-2" : "border-b-2"
            }`}
            onClick={() => showOrdersHandler()}
          >
            Orders
          </button>
          {/* <button
            className={`py-[0.5rem] px-[2rem] border-black ${
              showPersonalData
                ? "border-t-2 border-r-2 border-l-2"
                : "border-b-2"
            }`}
            onClick={() => showPersonalDataHandler(false)}
          >
            Personal Data
          </button> */}

          <div className="w-[2rem] border-b-2 border-black"></div>
        </div>
        {isLoading ? (
          <div className="loader-container">
            <CircularProgress className="loader" />
          </div>
        ) : (
          <> {showOrders ? <SellerOrdersSection /> : ""}</>
        )}
        {isLoading ? (
          <div className="loader-container">
            <CircularProgress className="loader" />
          </div>
        ) : (
          <> {showPersonalData ? <div>Hello from Personal Data</div> : ""}</>
        )}
        {isLoading ? (
          <div className="loader-container">
            <CircularProgress className="loader" />
          </div>
        ) : (
          <>
            <div
              className={`fixed top-0 transition-all ${
                createProductBar ? "right-0" : "right-[-40vw]"
              }`}
            >
              <ProductForm setCreateProductBar={setCreateProductBar} />
            </div>

            {showProducts ? <SellerProductSection /> : ""}
          </>
        )}
      </div>
    </div>
  );
};

export default SellerProfile;
