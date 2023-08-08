import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import "./Signin.css";
import axios from "axios";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  email: Yup.string().email("Invalid email").required("Required"),
});

const Signin = () => (
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
            console.log(values);
            axios

              .post("/seller/signin", values, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((response) => {
                console.log("Response from server:", response.data);
                localStorage.setItem("token", response.data.token);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
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
                  errors.password && touched.password && String(errors.password)
                }
                onChange={(event) => {
                  setFieldValue("password", event.target.value);
                }}
              />

              <br />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="image-section">
        <div className="image-text"></div>
      </div>
    </div>
  </div>
);

export default Signin;
