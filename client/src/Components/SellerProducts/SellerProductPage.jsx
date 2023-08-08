// ProductsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  TextField,
} from "@mui/material";
import { MdDelete, MdClose } from "react-icons/md";
import "./SellerProductPage.css"; // Import the CSS file

const SellerProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [editData, setEditData] = useState({});

  const [editBar, setEditBar] = useState(false);
  const [editBarWidth, setEditBarWidth] = useState(0);

  const [editImage, setEditImage] = useState("");
  const Server = "http://localhost:8000";

  const editBarOpen = (check, product) => {
    setEditBar(check);
    setEditData(product);
    setEditBarWidth("40vw");
    console.log(editData.imageUrl);
  };

  const updateHandler = (id) => {
    const token = localStorage.getItem("token");
    console.log(editData);
    axios
      .put("/seller/product/" + id, editData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      })
      .then((response) => {
        console.log("Updated Successfully");
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
      });
  };

  useEffect(() => {
    // Fetch products from the server
    axios
      .get("/seller/myProducts", {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    console.log(products);
  }, []);

  const deleteProduct = (id) => {
    // console.log("http://localhost:8000/seller/product/" + id);
    axios
      .delete("/seller/product/" + id, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("Object deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting object:", error);
      });
  };

  return (
    <>
      {editBar ? (
        <div
          id="editSideBar"
          className="editbar"
          style={{ width: editBarWidth }}
        >
          <div className="productName">
            <h2>Edit Product</h2>
            <span onClick={() => setEditBar(false)}>
              <MdClose size={40} />
            </span>
          </div>
          <TextField
            variant="outlined"
            label={"Name"}
            defaultValue={editData.name}
            value={editData.name}
            onChange={(event) => {
              setEditData({ ...editData, name: event.target.value });
            }}
          />
          <br />
          <TextField
            variant="outlined"
            label={"Description"}
            defaultValue={editData.description}
            value={editData.description}
            onChange={(event) => {
              setEditData({
                ...editData,
                description: event.target.value,
              });
            }}
          />
          <br />
          <TextField
            variant="outlined"
            label={"Price"}
            defaultValue={editData.price}
            value={editData.price}
            onChange={(event) => {
              setEditData({ ...editData, price: event.target.value });
            }}
          />
          <br />
          <input
            type="file"
            accept="image/*"
            // defaultValue={editData.imageUrl}
            onChange={(event) => {
              const selectedImage = event.target.files[0];
              if (selectedImage) {
                setEditData({
                  ...editData,
                  imageUrl: URL.createObjectURL(selectedImage),
                  image: selectedImage,
                });
              }
            }}
          />
          <br />
          {editData.imageUrl ? (
            <img src={editData.imageUrl} alt="" className="product-image" />
          ) : (
            ""
          )}
          <br />
          <Button
            type="submit"
            variant="contained"
            onClick={() => updateHandler(editData._id)}
          >
            Submit
          </Button>
        </div>
      ) : null}
      <Container maxWidth="md" sx={{ mt: 3, mb: 3 }}>
        <h1>Seller Products</h1>
        {products.length === 0 ? (
          <h1>No Products to show</h1>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => {
              return (
                <Grid item key={product._id} xs={12} sm={6} md={4}>
                  <Card className="card">
                    <CardContent className="card-content">
                      <div className="productName">
                        <Typography variant="h6" gutterBottom>
                          <b>Name:</b> {product.name}
                        </Typography>
                        <span onClick={() => deleteProduct(product._id)}>
                          <MdDelete size={30} />
                        </span>
                      </div>
                      <Typography variant="body1">
                        {product.description}
                      </Typography>
                      <Typography variant="subtitle1" className="price">
                        <b>Price:</b> ${product.price}
                      </Typography>
                      <img
                        src={product.imageUrl}
                        alt=""
                        className="product-image"
                      />
                      <Button
                        variant="contained"
                        onClick={() => editBarOpen(true, product)}
                      >
                        Edit
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default SellerProductsPage;
