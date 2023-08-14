import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, CircularProgress, Snackbar, Alert } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Signin from "../Signin/Signin";
import { clearCart } from "../../Store/Slices/cartSlices";
import "./CartPage.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cartProducts.product);
  const userData = useSelector((state) => state.userData.personalData.username);
  const [styleBar, setStyleBar] = useState(null);
  const [products, setProducts] = useState(cartProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const total = products.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (userData) {
      setStyleBar({ right: "60vw" });
    }
  }, [userData]);

  useEffect(() => {
    if (!userData) {
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 4000);
      setTimeout(() => {
        setOpenSnackbar(true);
      }, 1000);
    }
  }, []);

  const handleQuantityChange = (productId, change) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product._id === productId) {
          const newQuantity = product.quantity + change;
          return {
            ...product,
            quantity: newQuantity < 1 ? 1 : newQuantity,
          };
        }
        return product;
      });
      return updatedProducts;
    });
  };

  const handleQuantityInput = (productId, newQuantity) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product._id === productId) {
          return {
            ...product,
            quantity: newQuantity < 1 ? 1 : parseInt(newQuantity),
          };
        }
        return product;
      });
      return updatedProducts;
    });
  };
  const SignupSchema = Yup.object().shape({
    address: Yup.string()
      .min(20, "Address is too short, minimum 20 characters required.")
      .max(100, "Address is too long, maximum 100 characters allowed.")
      .required("Address is required."),

    contact: Yup.string()
      .matches(
        /^\+923\d{9}$/,
        "Invalid phone number format. Only numbers and '+92' allowed."
      )
      .required("Contact information is required."),
    receiver: Yup.string()
      .required("Reciver name is required")
      .min(4, "Name is too short")
      .max(30, "Name is too long"),
  });

  return (
    <div className="transition-all ease-out">
      {openSnackbar ? (
        <div
          className="absolute top-9 right-1/2 bg-white py-[10px] px-[3rem] rounded-2xl shadow-2xl border-black border-2"
          onClick={() => handleCloseSnackbar()}
        >
          Please Log in to proceed
        </div>
      ) : (
        ""
      )}

      <>
        {userData ? "" : <Signin secondary={true} />}
        <div
          className="cartContainer transition-all ease-in-out h-auto overflow-scroll"
          style={styleBar}
        >
          <div className="CartHeader">
            <h1>Cart</h1>
          </div>
          <div className="flex flex-col">
            {products.map((cartProduct, index) => {
              return (
                <div className="bg-white mb-[2rem]" key={index}>
                  <div className="flex">
                    <img
                      src={cartProduct.imageUrl}
                      alt={cartProduct?.name}
                      height={"100px"}
                      className="w-[100px] heigt-[100px] mr-[1rem] object-fill"
                    />
                    <div className="CartItemDetails">
                      <h2>{cartProduct?.name}</h2>
                      <p>{cartProduct?.description}</p>
                      <p>Price: ${cartProduct?.price}</p>
                      {userData ? (
                        <div className="quantity-controls">
                          <button
                            className="quantity-button"
                            onClick={() =>
                              handleQuantityChange(cartProduct._id, -1)
                            }
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={cartProduct.quantity}
                            onChange={(e) =>
                              handleQuantityInput(
                                cartProduct._id,
                                e.target.value
                              )
                            }
                          />
                          <button
                            className="quantity-button"
                            onClick={() =>
                              handleQuantityChange(cartProduct._id, 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {userData ? (
          <div className="bg-[#faf4e8] min-h-screen flex items-end pr-[4rem] flex-col py-[2rem]">
            <div className="w-[400px]">
              <div className="flex flex-row items-center">
                <h1
                  className="text-[32px]  hover:cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  CoCook
                </h1>
              </div>
              <h2 className="opacity-50 mb-[2rem] ">
                SingIn {" > "} Cart {" > "} <b> Shipping </b>
                {" > "} Payment{"  "}
              </h2>

              <div>
                <Formik
                  initialValues={{
                    address: "",
                    contact: "",
                    receiver: "",
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={(values) => {
                    setIsLoading(true);
                    setError("");
                    console.log(values, products);
                    const token = localStorage.getItem("token");
                    const payload = {
                      information: values,
                      products,
                      totalPrice: total,
                    };
                    axios
                      .post("/purchaser/checkout", payload, {
                        headers: {
                          "Content-Type": "application/json",
                          token: token,
                        },
                      })
                      .then((response) => {
                        console.log("Response from server:", response.data);
                        setIsLoading(false);
                        dispatch(clearCart());
                        navigate("/profile");
                      })
                      .catch((error) => {
                        console.error("Error:", error.message);
                        setError("Checkout Failed");
                        setIsLoading(false);
                        setOpenSnackbar(true);
                      });
                  }}
                >
                  {({ errors, touched, setFieldValue }) => (
                    <Form>
                      <div className="max-w-[400px]">
                        <div className="mb-[1rem]">
                          <TextField
                            name="receiver"
                            label="Receiver Name"
                            variant="outlined"
                            error={Boolean(errors.receiver && touched.receiver)}
                            helperText={
                              errors.receiver &&
                              touched.receiver &&
                              String(errors.receiver)
                            }
                            onChange={(event) => {
                              setFieldValue("receiver", event.target.value);
                            }}
                          />
                        </div>
                        <div className="mb-[1rem]">
                          <TextField
                            name="address"
                            label="Address"
                            variant="outlined"
                            error={Boolean(errors.address && touched.address)}
                            helperText={
                              errors.address &&
                              touched.address &&
                              String(errors.address)
                            }
                            onChange={(event) => {
                              setFieldValue("address", event.target.value);
                            }}
                          />
                        </div>
                        <div className="mb-[2rem]">
                          <TextField
                            name="contact"
                            label="Contact Number"
                            variant="outlined"
                            type="text"
                            error={Boolean(errors.contact && touched.contact)}
                            helperText={
                              errors.contact &&
                              touched.contact &&
                              String(errors.contact)
                            }
                            onChange={(event) => {
                              setFieldValue("contact", event.target.value);
                            }}
                          />
                        </div>

                        {isLoading ? (
                          <CircularProgress style={{ margin: "20px auto" }} />
                        ) : (
                          <>
                            <div className="w-full">
                              <button
                                className="w-full border-black border-2 py-[1rem] hover:bg-[#5a7057] hover:border-[#5a7057] hover:text-white transition-all"
                                type="submit"
                              >
                                Continue
                              </button>
                            </div>
                            {error && (
                              <Snackbar
                                open={openSnackbar}
                                autoHideDuration={6000}
                                onClose={handleCloseSnackbar}
                              >
                                <Alert
                                  severity="error"
                                  onClose={handleCloseSnackbar}
                                >
                                  {error}
                                </Alert>
                              </Snackbar>
                            )}
                          </>
                        )}
                        <br />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="flex items-end text-[22px]">
                <h1 className="text-[30px]">Total: </h1> {total}$
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default CartPage;
