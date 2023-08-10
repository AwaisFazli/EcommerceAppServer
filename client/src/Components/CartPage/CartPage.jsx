import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setOpenCart } from "../../Store/Slices/cartSlices";
import "./CartPage.css";

const CartPage = () => {
  const cartProduct = useSelector((state) => state.cartProducts.product);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const stock = cartProduct?.stock || 0;
  const totalPrice = cartProduct.price * quantity;

  const closeCart = () => {
    dispatch(setOpenCart(false));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity);
    }
  };
  useEffect(() => {
    setQuantity(1);
  }, [cartProduct]);

  return (
    <div className="cartContainer">
      <div className="CartHeader">
        <h1>Cart</h1>
        <span onClick={closeCart}>
          <MdClose size={35} />
        </span>
      </div>
      <div className="CartItem">
        <img src={cartProduct.imageUrl} alt={cartProduct?.name} />
        <div className="CartItemDetails">
          <h2>{cartProduct?.name}</h2>
          <p>{cartProduct?.description}</p>
          <p>Price: ${cartProduct?.price}</p>
          <div className="QuantityControl">
            <button onClick={() => handleQuantityChange(quantity - 1)}>
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
            />
            <button onClick={() => handleQuantityChange(quantity + 1)}>
              +
            </button>
          </div>
          <h4>Total Price: {totalPrice}</h4>
          <button className="BuyButton">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
