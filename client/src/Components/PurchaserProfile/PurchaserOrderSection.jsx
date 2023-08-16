import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import EachOrderSection from "./EachOrderSection";
import axios from "axios";

const PurchaserOrdersSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [ordersData, setOrdersData] = useState([]);
  const [eachOrder, setEachOrder] = useState(null);
  const [eachOrderSection, setEachOrderSection] = useState(false);

  const orderHandler = (order) => {
    setEachOrderSection(true);
    setEachOrder(order);
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
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
    <div>
      {isLoading ? (
        <div className="loader-container">
          <CircularProgress className="loader" />
        </div>
      ) : (
        <>
          <div
            className={`fixed top-0 transition-all ease-in ${
              eachOrderSection ? "right-[0]" : "right-[-40vw]"
            } w-[40vw] py-[2rem] px-[2rem] bg-white shadow-xl h-screen  overflow-y-scroll`}
          >
            <EachOrderSection
              order={eachOrder}
              setEachOrderSection={setEachOrderSection}
            />
          </div>

          <>
            {ordersData.length === 0 ? (
              <div className="flex py-[2rem] items-center justify-center text-[22px]">
                Currently you have no orders
              </div>
            ) : (
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
                            <td
                              className="py-3 text-center text-blue-400 hover:cursor-pointer"
                              onClick={() => orderHandler(order)}
                            >
                              {order._id}
                            </td>
                            <td className="py-3 text-center">
                              {order.receiver}
                            </td>
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
            )}
          </>
        </>
      )}
    </div>
  );
};

export default PurchaserOrdersSection;
