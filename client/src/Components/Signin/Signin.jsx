import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import axios from "axios";
import "./Signin.css";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  email: Yup.string().email("Invalid email").required("Required"),
});

const Signin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
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
                  .post("http://localhost:8000/seller/signin", values, {
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
                    setError("Login failed. Please check your credentials.");
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
                    setError("Login failed. Please check your credentials.");
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
                        <Alert severity="error" onClose={handleCloseSnackbar}>
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
  );
};

export default Signin;
