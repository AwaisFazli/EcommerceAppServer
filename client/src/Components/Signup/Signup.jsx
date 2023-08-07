import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import "./Signup.css";
import axios from "axios";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  // image: Yup.mixed().required("Please select an image file."),
});

const Signup = () => (
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
          onSubmit={(values) => {
            console.log(values);
            axios

              .post("/seller/signup", values, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((response) => {
                console.log("Response from server:", response.data);
              })
              .catch((error) => {
                console.error("Error:", error.message);
              });
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
                  errors.username && touched.username && String(errors.username)
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
                  errors.password && touched.password && String(errors.password)
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
              {/* <TextField
                name="image"
                variant="standard"
                type="file"
                error={Boolean(errors.image && touched.image)}
                helperText={
                  errors.image && touched.image && String(errors.image)
                }
                onChange={(event) => {
                  setFieldValue("image", event.target.files[0]);
                }}
              /> */}
              <br />

              <Button type="submit" variant="contained">
                Submit
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

export default Signup;
