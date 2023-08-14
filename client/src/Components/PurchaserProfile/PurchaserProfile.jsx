import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PurchaserOrdersSection from "./PurchaserOrderSection";
import { IoChevronBackSharp } from "react-icons/io5";
import { removeUserData } from "../../Store/Slices/userDataSlices";

const PurchaserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showOrders, setShowOrders] = useState(true);
  const [ordersData, setOrdersData] = useState([]);
  const userData = useSelector((state) => state.userData.personalData);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const signOutHandler = () => {
    dispatch(removeUserData);
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

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
    <div className="min-h-screen bg-[white]">
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
          className={`py-[0.5rem] px-[2rem] border-black border-b-2`}
          onClick={() => signOutHandler()}
        >
          Sign out
        </button>
        <button
          className={`py-[0.5rem] px-[2rem] border-black r ${
            showOrders ? "border-t-2 border-r-2 border-l-2" : "border-b-2"
          }`}
          onClick={() => setShowOrders(true)}
        >
          Orders
        </button>
        {/* <button
          className={`py-[0.5rem] px-[2rem] border-black ${
            showOrders ? "border-b-2" : "border-t-2 border-r-2 border-l-2"
          }`}
          onClick={() => setShowOrders(false)}
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
        <> {showOrders ? <PurchaserOrdersSection /> : ""}</>
      )}
    </div>
  );
};

export default PurchaserProfile;
