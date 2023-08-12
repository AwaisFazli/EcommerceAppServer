import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./HomePageStyles.css";
import Header from "../Header/Header";
import ProductCard from "../ProductCard/ProductCard";
import Footer from "../Footer/Footer";
import CartIcon from "../CartPage/CartIcon";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.cartProducts.isOpen);
  const navigate = useNavigate();

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
  const signOutHandler = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return (
    <div className=" bg-custom-gray ">
      <CartIcon />
      <div className="header relative">
        <Header />
        <div className="buy-anything-section">
          <div className="buy-anything-container">
            <div className="buy-anything-text">
              Buy Anything <br /> From Anywhere
              <br /> At Anytime
            </div>
            <div className="order-now-button-container">
              <button
                className="order-now-button"
                onClick={() => navigate("/products")}
              >
                Order Now
              </button>
            </div>
          </div>
          <div className="buy-anything-section-image-section hover transition-all">
            <div className="buy-anything-section-image-container">
              <img
                src="https://www.societe.com.qa/cdn/shop/files/Untitled-1-3_1080x.png?v=1633371538"
                alt=""
                className="w-[500px] h-[600px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="gallery-title-container">
        <p className="gallery-title bold-text  hover transition-all">Gallery</p>
      </div>

      <div className="gallery-section">
        <div className="gallery-column">
          <img
            src="https://www.societe.com.qa/cdn/shop/files/20221103_talabat_Qatar_Societe_Desserts_AND_IMG_9466_1_540x.jpg?v=1672471292"
            alt=""
            className="gallery-image large"
          />
          <img
            src="https://www.societe.com.qa/cdn/shop/files/WhatsApp_Image_2020-11-28_at_1.51.49_PM_2_540x.jpg?v=1646147895"
            alt=""
            className="gallery-image"
          />
        </div>
        <div className="gallery-column">
          <img
            src="https://www.societe.com.qa/cdn/shop/files/cheese_new_540x.jpg?v=1672471978"
            alt=""
            className="gallery-image"
          />
          <img
            src="https://www.societe.com.qa/cdn/shop/files/20221103_talabat_Qatar_Societe_Desserts_AND_IMG_9161_copy_1_540x.jpg?v=1672471906"
            alt=""
            className="gallery-image large"
          />
        </div>
        <div className="gallery-column">
          <img
            src="https://www.societe.com.qa/cdn/shop/files/20221103_talabat_Qatar_Societe_Desserts_AND_IMG_9502_540x.jpg?v=1672471503"
            alt=""
            className="gallery-image large"
          />
          <img
            src="https://www.societe.com.qa/cdn/shop/files/20221103_talabat_Qatar_Societe_Desserts_AND_IMG_9279_540x.jpg?v=1672472003"
            alt=""
            className="gallery-image"
          />
        </div>
      </div>
      <div className="bg-[#faf4e8] flex justify-center py-[3rem]">
        <h1 className="text-[2rem] font-medium transform hover:scale-110 transition-all">
          Products
        </h1>
      </div>
      <div className="product-list">
        {products.slice(-3).map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
      <div className="bg-white">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
