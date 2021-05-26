import React, { useContext } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { authContext } from "./context/AuthContext";
import { cartContext } from "./context/CartContext";
export default function NavBar() {
  const { state } = useContext(cartContext);
  const { isSignedIn } = useContext(authContext);
  return (
    <div className="navBar">
      <Link className="navLink" to="/">
        <h3>Logo</h3>
      </Link>
      <div className="links">
        <Link className="navLink" to="/shop">
          <li>Shop</li>
        </Link>
        <Link className="navLink" to="/about">
          <li>About</li>
        </Link>
        <Link className="navLink" to="/cart">
          <li>Cart ({state.cartItems.length})</li>
        </Link>
        {isSignedIn ? (
          <>
            <Link className="navLink">
              <button
                className="btn-sec"
                onClick={() => firebase.auth().signOut()}
              >
                Logout
              </button>
            </Link>
            <Link className="navLink" to="/login">
              <img
                className="avatar-small"
                src={firebase.auth().currentUser.photoURL}
                alt=""
              />
            </Link>
          </>
        ) : (
          <Link className="navLink" to="/login">
            <button className="btn-nav">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}
