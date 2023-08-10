import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./HomePageStyles.css";

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
    <div>
      <div className="header bg-custom-gray relative">
        <div className="profile-bar">
          <h1 className="profile-name">Awais</h1>{" "}
          <CgProfile className="avatar-icon" size={25} />
        </div>
        <div className="logo-section">
          <h1 className="logo-text">CoCook</h1>
        </div>
        <div className="nav-links-container">
          <Link to={"/"} className="nav-link">
            Home
          </Link>
          <Link to={"/signup"} className="nav-link">
            Join
          </Link>
          <Link to={"/signin"} className="nav-link">
            Login
          </Link>
          <Link to={"/"} className="nav-link">
            About
          </Link>
          <Link to={"/"} className="nav-link">
            Contact Us
          </Link>
        </div>
        <div className="buy-anything-section">
          <div className="buy-anything-container">
            <div className="buy-anything-text">
              Buy Anything <br /> From Anywhere
              <br /> At Anytime
            </div>
            <div className="order-now-button-container">
              <button className="order-now-button">Order Now</button>
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
        {products.map((product, index) => (
          <div key={index} className="product-card hover transition-all">
            <img src={product.imageUrl} alt="" className="product-image" />
            <div className="product-details">
              <h1 className="product-name">{product.name}</h1>
              <h1 className="product-divider">_______</h1>
              <h1 className="product-price">${product.price}</h1>
              <button className="order-button">Order Now</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cocook-section">
        <div className="cocook-content">
          <h1 className="cocook-title">CoCook</h1>
          <p className="cocook-description">
            CoCook is integral wholesale based on futurist vision,
            determination, hard work, and passion was the path a young Pakistani
            Man took a place since he was 20 years old.
          </p>
        </div>
        <div className="w-[70%] flex justify-center items-center">
          <img
            src="https://pfa.gop.pk/wp-content/uploads/2022/12/pfa-final-logo.png"
            alt=""
            className="cocook-image"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
