import React, { useEffect, useState } from "react";
import "./ProductCardStyle.css";
import { addCartProduct } from "../../Store/Slices/cartSlices";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ product }) => {
  const selectedProduct = useSelector((state) =>
    state.cartProducts.product.find((prod) => prod._id === product._id)
  );

  const userRole = useSelector((state) => state.userData.personalData.role);

  const dispatch = useDispatch();
  const { name, imageUrl, price } = product;

  const [disable, setDisable] = useState(selectedProduct?.addToCart);

  const addProductHander = () => {
    product.addToCart = true;
    product.quantity = 1;
    dispatch(addCartProduct(product));
    setDisable(true);
  };

  return (
    <div className="product-card hover transition-all">
      <img src={imageUrl} alt="" className="product-image" />
      <div className="product-details">
        <h1 className="product-name">{name}</h1>
        <h1 className="product-divider">_______</h1>
        <h1 className="product-price">${price}</h1>
        {userRole === "Seller" ? (
          <button className="order-button" disabled>
            Signin As Seller
          </button>
        ) : (
          <>
            {disable ? (
              <button className="order-button" disabled>
                Added
              </button>
            ) : (
              <button
                className="order-button"
                onClick={() => addProductHander()}
              >
                Add to cart
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
