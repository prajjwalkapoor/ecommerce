import React, { createContext, useState, useEffect, useReducer } from "react";
import firebase from "firebase";
export const cartContext = createContext();
export function CartProvider({ children }) {
  const user = firebase.auth().currentUser;
  const [products, setProducts] = useState([]);
  const [initialUserCart, setinitialUserCart] = useState({ cartItems: [] });
  const [initialState, setinitialState] = useState({ cartItems: [] });
  // let retrievedCart = [];
  useEffect(() => {
    if (user)
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          setinitialUserCart(doc.data());
        });
    // retrievedCart.concat(initialUserCart.cartItems);
    setinitialState(initialUserCart);
  }, []);

  console.log(initialUserCart.cartItems);
  //Reducer

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        const addedFilteredArr = products.filter((CartProduct) => {
          return CartProduct.id === action.payload;
        });
        return (state = {
          ...state,
          cartItems: state.cartItems.concat(addedFilteredArr),
        });
      case "REMOVE_FROM_CART":
        return (state = {
          ...state,
          cartItems: state.cartItems.filter((CartProduct) => {
            return CartProduct.id !== action.payload;
          }),
        });

      default:
        break;
    }
  };
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((products) => setProducts(products));
  }, []);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // window.localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    if (user)
      firebase.firestore().collection("users").doc(user.uid).set({
        cartItems: state.cartItems,
      });
  }, [state.cartItems]);
  return (
    <cartContext.Provider value={{ products, state, dispatch }}>
      {children}
    </cartContext.Provider>
  );
}
