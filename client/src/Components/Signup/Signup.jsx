import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { TextField, CircularProgress } from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import "./Signup.css";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username can be at most 50 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const previousUrl = useSelector((state) => state.urlState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [value, setValue] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setValue((prevValue) => {
          const val = (prevValue + 1) % 4;

          return val;
        });
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPaused]);

  return (
    <div className="min-h-screen flex items-center Signupcontainer">
      <div className="max-w-[600px] h-screen rounded-r-3xl bg-white flex items-center shadow-xl relative border-white border-2">
        <div className="absolute  top-0 left-0 p-[2rem]">
          <h1
            className="text-[32px] hover:cursor-pointer transform hover:scale-110 hover:text-[#3b5442] transition-all "
            onClick={() => navigate("/")}
          >
            CoCook
          </h1>
        </div>
        <div className="bg-white flex items-center flex-col p-[2rem]">
          <div className="flex items-start justify-start w-full">
            <h1 className="text-[22px]">Signup</h1>
          </div>
          <Formik
            initialValues={{
              username: "",
              password: "",
              confirmPassword: "",
              email: "",
              // image: null,
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              if (isSeller === true) {
                try {
                  setLoading(true);

                  const response = await axios.post("/seller/signup", values, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });

                  setLoading(false);

                  console.log("Response from server:", response.data);
                  navigate("/signin");
                } catch (error) {
                  setLoading(false);
                  console.error("Error:", error.message);
                  setError("SignUp failed please try again later");
                }
              } else {
                try {
                  setLoading(true);

                  const response = await axios.post(
                    "/purchaser/signup",
                    values,
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  setLoading(false);

                  if (previousUrl === "/cart") {
                    navigate("/cart");
                  } else {
                    navigate("/signin");
                  }
                } catch (error) {
                  setLoading(false);
                  console.error("Error:", error.message);
                  setError("SignUp failed please try again later");
                }
              }
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <TextField
                  name="username"
                  label="Name"
                  variant="standard"
                  error={Boolean(errors.username && touched.username)}
                  helperText={
                    errors.username &&
                    touched.username &&
                    String(errors.username)
                  }
                  onChange={(event) => {
                    setFieldValue("username", event.target.value);
                  }}
                  style={{ marginBottom: "1rem" }}
                />

                <TextField
                  name="email"
                  label="Email"
                  variant="standard"
                  error={Boolean(errors.email && touched.email)}
                  helperText={
                    errors.email && touched.email && String(errors.email)
                  }
                  onChange={(event) => {
                    setFieldValue("email", event.target.value);
                  }}
                />
                <div className="w-full h-[1rem]"></div>
                <TextField
                  name="password"
                  label="Password"
                  variant="standard"
                  type="password"
                  error={Boolean(errors.password && touched.password)}
                  helperText={
                    errors.password &&
                    touched.password &&
                    String(errors.password)
                  }
                  onChange={(event) => {
                    setFieldValue("password", event.target.value);
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="standard"
                  type="password"
                  error={Boolean(
                    errors.confirmPassword && touched.confirmPassword
                  )}
                  helperText={
                    errors.confirmPassword &&
                    touched.confirmPassword &&
                    String(errors.confirmPassword)
                  }
                  onChange={(event) => {
                    setFieldValue("confirmPassword", event.target.value);
                  }}
                />
                <div className="w-full h-[1rem]"></div>
                <div class="sellerCheckboxContainer">
                  <label class="switch">
                    <input
                      type="checkbox"
                      onChange={() => setIsSeller(!isSeller)}
                    />
                    <span class="slider round"></span>
                  </label>
                  <h4 className="">Sign up as a Seller</h4>
                </div>
                <div className="w-full h-[2rem]"></div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-[1rem] border-[#959191] border-2 text-[black] hover:border-[#3b5442] hover:bg-[#3b5442] hover:text-[#f7f2dd] transition-all"
                >
                  {loading ? <CircularProgress size={24} /> : "Submit"}{" "}
                </button>
                <div className="w-full flex justify-end text-red-500">
                  {error && <p className="error-message">{error}</p>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="flex grow  min-h-screen text-white z-50 relative overflow-hidden">
        <div
          className={`absolute top-[4rem]   max-w-[500px] ${
            value === 0 ? "right-[4rem]" : "right-[-40rem]"
          } transition-all ease-in`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <h1 className="text-[22px]">About Us:</h1>
          <p>
            Welcome to our delightful bakery wonderland, where the aroma of
            freshly baked goodies meets the excitement of a vibrant marketplace!
            Indulge in the joy of purchasing the finest bakery items, carefully
            curated to satisfy your cravings and elevate your culinary
            experiences. From irresistibly fluffy pastries to artisanal bread
            that's nothing short of a masterpiece, our diverse selection ensures
            that every palate finds its perfect match. But we're not just about
            tantalizing your taste buds; we're also here to empower talented
            bakers to showcase their creations and share their passion with the
            world. Whether you're a devoted purchaser or a dedicated seller, our
            platform is your gateway to a world of delightful possibilities.
          </p>
        </div>
        <div
          className={`absolute top-[4rem]   max-w-[500px] ${
            value === 1 ? "right-[4rem]" : "right-[-40rem]"
          } transition-all ease-in`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <h1 className="text-[22px]">For Taste lovers:</h1>
          <p>
            Calling all dessert enthusiasts and food lovers! Explore our virtual
            bakery haven, where you can effortlessly browse through a medley of
            delectable treats that are just a click away from becoming the
            highlight of your day. Dive into a symphony of flavors, from classic
            favorites that bring back cherished memories to innovative creations
            that redefine the art of baking. With a seamless shopping experience
            and secure checkout, you can indulge in your guilty pleasures with
            confidence. Discover the joy of connecting with local bakers and
            their heartwarming stories, knowing that every purchase supports
            their craft and dedication. Welcome to a world where your sweetest
            dreams come true.
          </p>
        </div>
        <div
          className={`absolute top-[4rem]   max-w-[500px] ${
            value === 2 ? "right-[4rem]" : "right-[-40rem]"
          } transition-all ease-in`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <h1 className="text-[22px]">For Taste Makers:</h1>
          <p>
            Are you a passionate baker with a gift for creating edible
            enchantments? Join our community of like-minded artisans and take
            your culinary journey to new heights. As a seller on our platform,
            you'll have the opportunity to showcase your expertise and share
            your culinary treasures with a wide audience of food enthusiasts.
            Whether you're a seasoned professional or a home baker with a unique
            flair, our platform provides the tools and exposure you need to turn
            your passion into a thriving business. From personalized shops that
            reflect your style to secure transactions and customer feedback,
            we're here to empower you every step of the way. Start your journey
            with us and let your bakery creations find their rightful place in
            the hearts and homes of delighted customers.
          </p>
        </div>
        <div
          className={`absolute top-[4rem]   max-w-[500px] ${
            value === 3 ? "right-[4rem]" : "right-[-40rem]"
          } transition-all ease-in`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <h1 className="text-[22px]">Our Promise:</h1>
          <p>
            At our bakery-centric marketplace, we're more than just an online
            store – we're a community that celebrates the art of baking and the
            joy it brings. With a commitment to quality and authenticity, we
            ensure that every purchase is a delightful experience for both
            purchasers and sellers. From freshly baked goods that melt in your
            mouth to a supportive ecosystem that nurtures culinary talents, our
            platform is a testament to the magic that happens when passion meets
            innovation. Join us in savoring the moments that only a warm,
            oven-fresh treat can create. Whether you're here to shop or to
            share, your journey with us promises to be a slice of heaven.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
