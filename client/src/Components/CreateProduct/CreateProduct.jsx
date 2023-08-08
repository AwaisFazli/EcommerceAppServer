import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductForm.css";

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  price: Yup.number()
    .min(0, "Price must be a positive number")
    .required("Required"),
  description: Yup.string().required("Required"),
  stockQuantity: Yup.number()
    .min(0, "Quantity must be a positive number")
    .required("Required"),
  image: Yup.mixed().required("Please select an image file."),
});

const ProductForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  return (
    <div className="ProductContainer">
      <div className="ProductFormWrapper">
        <div className="ProductForm">
          <h1>Add Product</h1>
          <Formik
            initialValues={{
              name: "",
              price: "",
              description: "",
              stockQuantity: "",
              image: null,
            }}
            validationSchema={ProductSchema}
            onSubmit={async (values) => {
              setIsLoading(true);
              setError(null);

              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("price", values.price);
              formData.append("description", values.description);
              formData.append("stockQuantity", values.stockQuantity);
              formData.append("image", values.image);

              try {
                const response = await axios.post("/seller/product", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    token: localStorage.getItem("token"),
                  },
                });
                console.log("Product added successfully:", response.data);
                setIsLoading(false);
                navigate("/sellerproducts");
              } catch (error) {
                console.error("Error adding product:", error.message);
                setError("Error adding product. Please try again.");
                setIsLoading(false);
              }
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <TextField
                  name="name"
                  label="Product Name"
                  variant="standard"
                  error={Boolean(errors.name && touched.name)}
                  helperText={
                    errors.name && touched.name && String(errors.name)
                  }
                  onChange={(event) => {
                    setFieldValue("name", event.target.value);
                  }}
                />
                <TextField
                  name="price"
                  label="Price"
                  variant="standard"
                  type="number"
                  error={Boolean(errors.price && touched.price)}
                  helperText={
                    errors.price && touched.price && String(errors.price)
                  }
                  onChange={(event) => {
                    setFieldValue("price", event.target.value);
                  }}
                />
                <TextField
                  name="description"
                  label="Description"
                  variant="standard"
                  multiline
                  rows={4}
                  error={Boolean(errors.description && touched.description)}
                  helperText={
                    errors.description &&
                    touched.description &&
                    String(errors.description)
                  }
                  onChange={(event) => {
                    setFieldValue("description", event.target.value);
                  }}
                />
                <TextField
                  name="stockQuantity"
                  label="Stock Quantity"
                  variant="standard"
                  type="number"
                  error={Boolean(errors.stockQuantity && touched.stockQuantity)}
                  helperText={
                    errors.stockQuantity &&
                    touched.stockQuantity &&
                    String(errors.stockQuantity)
                  }
                  onChange={(event) => {
                    setFieldValue("stockQuantity", event.target.value);
                  }}
                />
                <br />
                <TextField
                  name="image"
                  variant="standard"
                  type="file"
                  error={Boolean(errors.image && touched.image)}
                  helperText={
                    errors.image && touched.image && String(errors.image)
                  }
                  onChange={(event) => {
                    setFieldValue("image", event.target.files[0]);
                    setUploadedImage(
                      URL.createObjectURL(event.target.files[0])
                    );
                  }}
                />
                <br />
                <br />
                <div className="ProductImageSection">
                  {uploadedImage && (
                    <img
                      src={uploadedImage}
                      alt="Uploaded Product"
                      className="uploaded-image"
                      style={{ height: "100px", width: "100%" }}
                    />
                  )}
                </div>
                <div className="button-container">
                  {isLoading ? (
                    <CircularProgress className="loader" />
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      className="add-button"
                    >
                      Add Product
                    </Button>
                  )}
                  {error && <div className="error">{error}</div>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
