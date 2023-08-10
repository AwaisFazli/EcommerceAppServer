import "./App.css";
import React from "react";
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

function App() {
  const user = "";
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/sellerproducts" element={<SellerProductPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        {/* <div className="App">
      <Router>{user ? <ProtectedRoutes /> : <AuthRoutes />}</Router>
    </div> */}
      </div>
    </Router>
  );
}

export default App;
