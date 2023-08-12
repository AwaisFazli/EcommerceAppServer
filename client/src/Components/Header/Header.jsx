import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import "./HeaderStyles.css";
import { useSelector, useDispatch } from "react-redux";
import { removeUserData } from "../../Store/Slices/userDataSlices";

const Header = ({ textColor, background }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData.personalData);

  const signOutHandler = () => {
    dispatch(removeUserData);
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div style={{ background: background }}>
      <div className="profile-bar" style={{ color: textColor }}>
        {userData.username ? (
          <>
            <h1 className="profile-name">{userData.username}</h1>
            <CgProfile className="avatar-icon" size={25} />
          </>
        ) : (
          ""
        )}
      </div>
      <div className="logo-section">
        <h1 className="logo-text" style={{ color: textColor }}>
          CoCook
        </h1>
      </div>
      <div className="nav-links-container" style={{ color: textColor }}>
        <Link to={"/"} className="nav-link">
          Home
        </Link>
        {userData.username ? null : (
          <>
            <Link to={"/signup"} className="nav-link">
              Join
            </Link>
            <Link to={"/signin"} className="nav-link">
              Login
            </Link>
          </>
        )}

        <Link to={"/"} className="nav-link">
          About
        </Link>
        <Link to={"/"} className="nav-link">
          Contact Us
        </Link>
        <Link to={"/products"} className="nav-link">
          Order Now
        </Link>
        {userData.username ? (
          <>
            <button className="nav-link" onClick={() => signOutHandler()}>
              Sign out
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
