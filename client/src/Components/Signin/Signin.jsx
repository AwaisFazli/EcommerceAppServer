import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Assuming you're using React Router
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserData } from "../../Store/Slices/userDataSlices";
import { IoChevronBackSharp } from "react-icons/io5";
import "./Signin.css";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  email: Yup.string().email("Invalid email").required("Required"),
});

const Signin = ({ secondary }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const dispatch = useDispatch();
  console.log(location.pathname);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const setUserData = (payload) => {
    dispatch(addUserData(payload));
  };

  const setUserDataHandler = (token) => {
    axios
      .get("/seller/userdata", {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      })
      .then((response) => {
        setUserData(response.data);
        setIsLoading(false);
        navigate("/cart");
      })
      .catch((error) => {
        console.error(error.message);
        setIsLoading(false);
      });
  };
  return (
    <>
      {secondary ? (
        <div className="bg-[#faf4e8] flex flex-col  px-[2rem] pt-[2rem] grow min-h-screen overflow-scroll">
          <div>
            <div className="flex flex-row items-center">
              <span
                className="mr-[2rem] hover:cursor-pointer hover:text-[#5a7057]"
                onClick={() => navigate("/")}
              >
                <IoChevronBackSharp size={30} />
              </span>
              <h1
                className="text-[32px] mb-[rem] hover:cursor-pointer"
                onClick={() => navigate("/")}
              >
                CoCook
              </h1>
            </div>
            <h2 className="opacity-50 mb-[2rem] ml-[4rem]">
              SingIn {" > "} Cart {" > "} Shipping {" > "} Payment{"  "}
            </h2>
          </div>
          <div className=" h-full flex justify-center flex-col">
            <div className="">
              <h2 className="text-[26px] mb-[2rem]">Log in</h2>
            </div>
            <Formik
              initialValues={{
                password: "",
                email: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                setIsLoading(true);
                setError("");

                axios
                  .post("/purchaser/signin", values, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                  .then((response) => {
                    console.log("Response from server:", response.data);
                    localStorage.setItem("token", response.data.token);
                    console.log("Worked till here");
                    setUserDataHandler(response.data.token);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                    setError("Login failed. Please check your credentials.");
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
                        name="email"
                        label="Email"
                        variant="outlined"
                        error={Boolean(errors.email && touched.email)}
                        helperText={
                          errors.email && touched.email && String(errors.email)
                        }
                        onChange={(event) => {
                          setFieldValue("email", event.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-[2rem]">
                      <TextField
                        name="password"
                        label="Password"
                        variant="outlined"
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
                            Sign In
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
                    <div className="donthaveAccount">
                      <Link to={"/signup"}>Dont have an account?</Link>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="form-wrapper">
            <div className="form">
              <h1>Log in</h1>
              <Formik
                initialValues={{
                  password: "",
                  email: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  if (isSeller == true) {
                    setIsLoading(true);
                    setError("");

                    axios
                      .post("/seller/signin", values, {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      })
                      .then((response) => {
                        console.log("Response from server:", response.data);
                        localStorage.setItem("token", response.data.token);
                        setIsLoading(false);
                        navigate("/");
                        window.location.reload();
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                        setError(
                          "Login failed. Please check your credentials."
                        );
                        setIsLoading(false);
                        setOpenSnackbar(true);
                      });
                  } else {
                    setIsLoading(true);
                    setError("");

                    axios
                      .post("http://localhost:8000/purchaser/signin", values, {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      })
                      .then((response) => {
                        console.log("Response from server:", response.data);
                        localStorage.setItem("token", response.data.token);
                        setIsLoading(false);
                        navigate("/");
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                        setError(
                          "Login failed. Please check your credentials."
                        );
                        setIsLoading(false);
                        setOpenSnackbar(true);
                      });
                  }
                }}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form>
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
                    />
                    <div class="sellerCheckboxContainer">
                      <label class="switch">
                        <input
                          type="checkbox"
                          onChange={() => setIsSeller(!isSeller)}
                        />
                        <span class="slider round"></span>
                      </label>
                      <h4 className="">Is Seller?</h4>
                    </div>

                    {isLoading ? (
                      <CircularProgress style={{ margin: "20px auto" }} />
                    ) : (
                      <>
                        <Button type="submit" variant="contained">
                          Submit
                        </Button>
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
                    <div className="donthaveAccount">
                      <Link to={"/signup"}>Dont have an account?</Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signin;
