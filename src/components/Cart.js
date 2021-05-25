import React, { useContext } from "react";
import { cartContext } from "./context/GlobalContext";
import { Link } from "react-router-dom";
import CartDetails from "./CartDetails";

export default function Cart() {
  document.title = "Cart Page";
  const { state, dispatch } = useContext(cartContext);
  return (
    <div>
      <h1>
        {state.cartItems.length === 0 ? "Ahh! No items in cart" : "Cart Page"}
      </h1>
      <CartDetails />
      <div className="productList">
        {state.cartItems.map((product) => {
          return (
            <div className="shopProductContainer">
              <Link className="link" to={`/shop/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  width="40%"
                  height="40%"
                />
                <h3>{product.title}</h3>{" "}
              </Link>
              <h4 className="greytext">
                Product Category : {product.category}
              </h4>
              <h3>Price : ${product.price}</h3>
              <button
                key={product.id}
                onClick={() => {
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: product.id,
                  });
                }}
              >
                Remove From Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
