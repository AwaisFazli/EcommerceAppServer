import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const EachOrderSection = ({ order, setEachOrderSection }) => {
  const [data, setData] = useState(order);

  useEffect(() => {
    setData(order);
  }, [order]);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    // timeZoneName: "short",
  };
  const date = new Date(data?.date);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-[22px]">Order</h1>
        <span onClick={() => setEachOrderSection(false)}>
          <MdClose size={35} />
        </span>
      </div>
      <div className="flex flex-row space-x-3 py-[1rem]">
        <h1 className="R">Created At: </h1>
        <h1> {date?.toLocaleDateString("en-PK", options)}</h1>
      </div>
      <h1 className="text-[18px]">Purchaser Info:</h1>
      <div className="ml-[1rem] mb-[1rem]">
        <h1>Name: {data?.receiver}</h1>
        <h1>Address: {data?.address}</h1>
        <h1>Contact: {data?.contact}</h1>
      </div>
      <h1 className="text-[18px] mb-[1rem]">Products Included:</h1>
      <div>
        {data?.products.map((product, index) => {
          return (
            <div className="flex mb-[1rem]">
              <div className="w-[100px] h-[100px] overflow-hidden">
                <img src={product.imageUrl} alt="" />
              </div>
              <div className="px-[1rem]">
                <h1>{product.name}</h1>
                <h1>Price: ${product.price}</h1>
                <h1>Description: {product.description}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EachOrderSection;
