import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./ProductPage.css";
import { useDispatch } from "react-redux";
import { addCartProduct, setOpenCart } from "../../Store/Slices/cartSlices";
import { useSelector } from "react-redux";
import CartPage from "../CartPage/CartPage";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.cartProducts.isOpen);
  const navigate = useNavigate();

  // const Server = "http://localhost:8000";

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    axios
      .get("http://localhost:8000/products")
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

  const cartProductHandler = (product) => {
    const token = localStorage.getItem("token");
    // const token = null;
    if (token) {
      dispatch(addCartProduct(product));
      dispatch(setOpenCart(true));
    } else {
      navigate("/signin");
    }
  };

  return (
    <div>
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <nav className="navbar ">
          <h2 className="">Home Page</h2>
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
                            <b>{product.name}</b>
                          </Typography>
                          <Typography variant="body1">
                            {product.description}'{" "}
                          </Typography>
                          <Typography variant="subtitle1" className="price">
                            Price: ${product.price}
                          </Typography>
                          <Typography variant="subtitle1" className="price">
                            Stock: {product.stock}
                          </Typography>
                          <img
                            src={product.imageUrl}
                            alt=""
                            className="product-image"
                          />
                          <span onClick={() => cartProductHandler(product)}>
                            <Button variant="contained">Buy Now</Button>
                          </span>
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
      {isCartOpen ? <CartPage /> : null}
    </div>
  );
};

export default ProductsPage;
