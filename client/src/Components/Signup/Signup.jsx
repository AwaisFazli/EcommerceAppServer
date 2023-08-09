import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress } from "@mui/material";
import "./Signup.css";
import axios from "axios";

const SignupSchema = Yup.object().shape({
  // ... Your existing validation schema ...
});

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSeller, setIsSeller] = useState(false);

  return (
    <div className="Signupcontainer">
      <div className="Signupform-wrapper">
        <div className="Signupform">
          <h1>Signup</h1>
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
                  setError("Login failed. Please try again.");
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

                  console.log("Response from server:", response.data);
                  navigate("/signin");
                } catch (error) {
                  setLoading(false);
                  console.error("Error:", error.message);
                  setError("Login failed. Please try again.");
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
                <br />
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
                {error && <p className="error-message">{error}</p>}{" "}
                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : "Submit"}{" "}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="Signupimage-section">
          <div className="Signupimage-text"></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
