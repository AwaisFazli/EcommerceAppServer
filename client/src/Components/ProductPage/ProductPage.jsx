import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { Pagination } from "@mui/material";
import CartPage from "../CartPage/CartPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductCard from "../ProductCard/ProductCard";
import CartIcon from "../CartPage/CartIcon";
import axios from "axios";
import "./ProductPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const isCartOpen = useSelector((state) => state.cartProducts.isOpen);
  const [page, setPage] = React.useState(1);
  const offset = 8;
  const count = Math.ceil(products.length / offset);
  const handleChange = (event, value) => {
    setPage(value);
  };

  // const Server = "http://localhost:8000";

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    axios
      .get("/products")
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching products:", error.message);
      });
  }, []);

  return (
    <div className="background-white">
      <CartIcon />
      <Header textColor={"#393f51"} background={"#faf4e8"} />
      {isLoading ? (
        <div className="loader-container">
          <CircularProgress className="loader" />
        </div>
      ) : (
        <div>
          <div className="product-page-title-section">
            Taste The Freshness From Oven
          </div>
          <div className="product-page-pagination-section background-pink">
            <Pagination
              count={count}
              page={page}
              onChange={handleChange}
              size="large"
            />
          </div>

          <div className="product-page-grid background-pink">
            {products.slice(page, page + offset).map((product, index) => {
              return <ProductCard product={product} key={index} />;
            })}
          </div>
        </div>
      )}

      {isCartOpen ? <CartPage /> : null}
      <div className="bg-white">
        <Footer />
      </div>
    </div>
  );
};

export default ProductsPage;
