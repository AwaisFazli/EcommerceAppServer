import React from "react";
import "./FooterStyle.css";

const Footer = () => {
  return (
    <div className="cocook-section">
      <div className="cocook-content">
        <h1 className="cocook-title">CoCook</h1>
        <p className="cocook-description">
          CoCook is integral wholesale based on futurist vision, determination,
          hard work, and passion was the path a young Pakistani Man took a place
          since he was 20 years old.
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
  );
};

export default Footer;
