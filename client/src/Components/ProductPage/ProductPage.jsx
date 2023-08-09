import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./ProductPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");

  // const Server = "http://localhost:8000";

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    axios
      .get("/products")
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching products:", error.message);
      });
  }, []);
  const signOutHandler = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <nav className="navbar">
        <h2>Home Page</h2>
        <div className="navbar-buttons">
          {token ? (
            <Link to="/sellerproducts">Dashboard</Link>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
          {token ? (
            <Link to="/" onClick={() => signOutHandler()}>
              Sign Out
            </Link>
          ) : (
            <Link to="/signup">Sign Up</Link>
          )}
        </div>
      </nav>

      {isLoading ? (
        <div className="loader-container">
          <CircularProgress className="loader" />
        </div>
      ) : (
        <React.Fragment>
          {products.length === 0 ? (
            <h1>No Products to show</h1>
          ) : (
            <Grid container spacing={3}>
              {products.map((product) => {
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
        </React.Fragment>
      )}
    </Container>
  );
};

export default ProductsPage;
