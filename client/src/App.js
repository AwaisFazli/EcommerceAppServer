import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import CreateProduct from "./Components/CreateProduct/CreateProduct";
import ProductPage from "./Components/ProductPage/ProductPage";
import CartPage from "./Components/CartPage/CartPage";
// import AuthRoutes from "./routes/Auth";
// import ProtectedRoutes from "./routes/ProtectedRoutes";
import SellerProductPage from "./Components/SellerProducts/SellerProductPage";
import HomePage from "./Components/HomePage/HomePage";
import ProductsPage from "./Components/ProductPage/ProductPage";
import PurchaserProfile from "./Components/PurchaserProfile/PurchaserProfile";
import SellerProfile from "./Components/SellerProfile/SellerProfile";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "./Store/Slices/userDataSlices";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const setUserData = (payload) => {
    dispatch(addUserData(payload));
  };

  useEffect(() => {
    // setToken(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/purchaser/userdata", {
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

  const user = "";
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/products" element={<ProductsPage />} />
          <Route exact path="/sellerproducts" element={<SellerProductPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<PurchaserProfile />} />
          <Route path="/seller" element={<SellerProfile />} />
        </Routes>
        {/* <div className="App">
      <Router>{user ? <ProtectedRoutes /> : <AuthRoutes />}</Router>
    </div> */}
      </div>
    </Router>
  );
}

export default App;
