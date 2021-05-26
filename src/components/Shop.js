import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "./context/CartContext";
export default function Shop() {
  document.title = "Shop Page";
  const { products, dispatch, state } = useContext(cartContext);
  const [priceSort, setPriceSort] = useState("default");
  switch (priceSort) {
    case "increasing":
      products.sort((a, b) => a.price - b.price);
      break;
    case "decreasing":
      products.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }
  return (
    <div>
      <h1>Shop</h1>
      <div className="filter-container">
        <div>
          <h3>Filter Products</h3>
          <div className="filters">
            <h4>Price Sort</h4>
            <select onChange={(e) => setPriceSort(e.target.value)}>
              <option value="default">Select:</option>
              <option value="increasing">Low to High</option>
              <option value="decreasing">High to Low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="productList">
        {products.map((product) => {
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
              <h3 className="greytext">Price : ${product.price}</h3>

              {state.cartItems.some((item) => item.id === product.id) ? (
                <Link to="/cart">
                  <button key={product.id}>Go To Cart</button>
                </Link>
              ) : (
                <button
                  key={product.id}
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: product.id,
                    });
                  }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
