import React, { useEffect, useState, useContext } from "react";
import { cartContext } from "./context/CartContext";
import { Link } from "react-router-dom";
export default function SingleProduct({ match }) {
  const { dispatch, state } = useContext(cartContext);
  const [product, setProduct] = useState({});
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const getProduct = () => {
      fetch(`https://fakestoreapi.com/products/${match.params.id}`)
        .then((res) => res.json())
        .then((product) => setProduct(product));
    };
    getProduct();
    setisLoading(false);
  }, [match.params.id]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <div>
        <h1>Item Description</h1>
        <div className="productContainer">
          <div className="innerContainer">
            <img src={product.image} alt={product.title} width="70%"></img>
          </div>
          <div className="innerContainer">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <h3>
              Price: <span className="greytext"> ${product.price}</span>{" "}
              Category:
              <span className="greytext"> {product.category}</span>
            </h3>
            {state.cartItems.some((item) => item.id === product.id) ? (
              <Link to="/cart">
                <button>Go To Cart</button>
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
        </div>
      </div>
    );
  }
}
