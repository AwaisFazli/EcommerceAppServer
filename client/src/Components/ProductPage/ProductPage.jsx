// ProductsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, CardContent, Typography, Container } from "@mui/material";
import { MdDelete } from "react-icons/md";
import "./ProductPage.css"; // Import the CSS file

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const Server = "http://localhost:8000";

  useEffect(() => {
    // Fetch products from the server
    axios
      .get("/products")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products Here:", error.message);
      });
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      {products.length === 0 ? (
        <h1>No Products to show</h1>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => {
            console.log(product.imgUrl);
            return (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <Card className="card">
                  <CardContent className="card-content">
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body1">
                      {product.description}
                    </Typography>
                    <Typography variant="subtitle1" className="price">
                      Price: ${product.price}
                    </Typography>
                    {/* <img
                      src={product.imageUrl}
                      alt=""
                      className="product-image"
                    /> */}

                    <img
                      src={product.imageUrl}
                      alt=""
                      className="product-image"
                    />
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default ProductsPage;
