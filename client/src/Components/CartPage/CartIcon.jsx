import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
const CartIcon = () => {
  const naviagate = useNavigate();
  const cartItem = useSelector((state) => state.cartProducts.product.length);

  return (
    <>
      {cartItem > 0 ? (
        <div
          className="right-24 bottom-24 z-[100] fixed bg-white rounded-full p-[10px] shadow-2xl hover:cursor-pointer"
          onClick={() => naviagate("/cart")}
        >
          <AiOutlineShoppingCart size={30} color="black" />
          <p className="absolute bg-red-400 rounded-full p-[5px] px-[10px] text-[12px] -bottom-2 -left-2">
            {cartItem}
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CartIcon;
