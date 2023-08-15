import React, { useState, useEffect } from "react";
import axios from "axios";
import EditProduct from "../EditProduct/EditProduct";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const SellerProductSection = () => {
  const reloadProducts = useSelector((state) => state.userData.reload);
  console.log(reloadProducts);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editBar, setEditBar] = useState(false);
  const [editProductData, setEditProductData] = useState({});
  const [sellerProducts, setSellerProducts] = useState([]);
  const [loadProducts, setLoadProducts] = useState(1);

  const closeEditProductBar = (check) => {
    setEditBar(check);
  };

  const editProductHandler = (productData) => {
    setEditProductData(productData);
    setEditBar(true);
  };

  useEffect(() => {
    // Fetch products from the server
    console.log("in");
    setIsLoading(true);
    axios
      .get("/seller/myProducts", {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setSellerProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, [reloadProducts]);

  const deleteProduct = (id) => {
    setIsDeleteLoading(true);
    axios
      .delete("/seller/product/" + id, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("Object deleted successfully:", response.data);
        setIsDeleteLoading(false);
        setSellerProducts((sellerProducts) =>
          sellerProducts.filter((product) => product._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting object:", error);
        setIsDeleteLoading(false);
      });
  };

  return (
    <div className="px-[2rem] py-[2rem]">
      {isLoading ? (
        <div className="loader-container">
          <CircularProgress className="loader" />
        </div>
      ) : (
        <>
          <div
            className={`h-screen fixed top-0 transition-all ease-in ${
              editBar ? "right-0" : "right-[-40vw]"
            } w-[40vw] bg-[white]  px-[2rem] py-[2rem] drop-shadow-xl overflow-y-scroll`}
          >
            <EditProduct
              editProductData={editProductData}
              closeEditProductBar={closeEditProductBar}
            />
          </div>

          {sellerProducts.length === 0 ? (
            <div className="flex py-[2rem] items-center justify-center text-[22px]">
              Add products to show here
            </div>
          ) : (
            <div className="transition-all">
              <div className=" mb-[2rem]">
                <h1 className="text-[22px]">Your Products</h1>
              </div>
              <div>
                {sellerProducts.reverse().map((product, index) => {
                  return (
                    <div
                      className="flex flex-row mb-[2rem] border-black shadow-xl"
                      key={index}
                    >
                      <div className="w-[100px] h-[100px] overflow-hidden">
                        <img src={product.imageUrl} alt="" />
                      </div>
                      <div className="flex flex-col justify-center mx-[2rem] w-[200px]">
                        <h1>Name</h1>
                        <h1>{product.name}</h1>
                      </div>
                      <div className="flex flex-col justify-center mx-[2rem] x">
                        <h1>Price</h1>
                        <h1>{product.price}</h1>
                      </div>
                      <div className="flex flex-col justify-center mx-[2rem] x">
                        <button
                          className=""
                          onClick={() => editProductHandler(product)}
                        >
                          Edit
                        </button>
                      </div>
                      <div className="flex flex-col justify-center mx-[2rem] text-red-500">
                        {isDeleteLoading ? (
                          <div className="w-[100px] h-[100px] flex items-center justify-center">
                            <CircularProgress className="loader" />
                          </div>
                        ) : (
                          <button
                            className=""
                            onClick={() => deleteProduct(product._id)}
                          >
                            Delete Product
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SellerProductSection;
