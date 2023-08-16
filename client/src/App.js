import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUserData } from "./Store/Slices/userDataSlices";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import CreateProduct from "./Components/CreateProduct/CreateProduct";
import CartPage from "./Components/CartPage/CartPage";
import SellerProductPage from "./Components/SellerProducts/SellerProductPage";
import HomePage from "./Components/HomePage/HomePage";
import ProductsPage from "./Components/ProductPage/ProductPage";
import PurchaserProfile from "./Components/PurchaserProfile/PurchaserProfile";
import SellerProfile from "./Components/SellerProfile/SellerProfile";

import axios from "axios";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const setUserData = (payload) => {
    dispatch(addUserData(payload));
  };

  useEffect(() => {
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
      </div>
    </Router>
  );
}

export default App;
