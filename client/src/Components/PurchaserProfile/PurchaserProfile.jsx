import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import axios from "axios";

const PurchaserProfile = () => {
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
    <div className="min-h-screen bg-[#faf4e8]">
      <div className="flex flex-row items-end space-x-2 px-[2rem] pt-[2rem]">
        <h1 className="text-[22px] pb-[5px]"> Welcome</h1>{" "}
        <h1 className="text-[32px]">{userData.username}</h1>
      </div>
      <div className="flex justify-end">
        <div className="flex grow border-b-2 border-black"></div>
        <button
          className={`py-[0.5rem] px-[2rem] border-black r ${
            showOrders ? "border-t-2 border-r-2 border-l-2" : "border-b-2"
          }`}
          onClick={() => setShowOrders(true)}
        >
          Orders
        </button>
        <button
          className={`py-[0.5rem] px-[2rem] border-black ${
            showOrders ? "border-b-2" : "border-t-2 border-r-2 border-l-2"
          }`}
          onClick={() => setShowOrders(false)}
        >
          Personal Data
        </button>
        <div className="w-[2rem] border-b-2 border-black"></div>
      </div>
      {isLoading ? (
        <div className="loader-container">
          <CircularProgress className="loader" />
        </div>
      ) : (
        <>
          {" "}
          {showOrders ? (
            <div className="py-6 px-8">
              <h1 className="text-3xl font-semibold mb-4">Your Orders</h1>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="py-2">Index</th>
                    <th className="py-2">Id</th>
                    <th className="py-2">Receiver</th>
                    <th className="py-2">Created On</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersData.map((order, index) => {
                    const date = new Date(order.date);
                    return (
                      <>
                        <tr key={order._id} className="border-b">
                          <td className="py-3 text-center">{index + 1}</td>
                          <td className="py-3 text-center">{order._id}</td>
                          <td className="py-3 text-center">{order.receiver}</td>
                          <td className="py-3 text-center">
                            {date.toLocaleDateString("en-PK", options)}
                          </td>
                          <td className="py-3 text-center">{order.status}</td>
                        </tr>
                        <tr>
                          <td colSpan={5}>
                            <div
                              className="bg-white mb-[2rem] flex w-full"
                              key={index}
                            ></div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default PurchaserProfile;
