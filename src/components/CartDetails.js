import React, { useContext } from "react";
import { cartContext } from "./context/CartContext";

export default function CartDetails() {
  const { state } = useContext(cartContext);
  return (
    <div>
      {state.cartItems.length !== 0 ? (
        <h1>
          Total Price : $
          {state.cartItems.reduce((acc, value) => {
            acc += value.price;
            return acc;
          }, 0)}
        </h1>
      ) : (
        ""
      )}
    </div>
  );
}
