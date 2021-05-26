import "./App.css";
import React from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Shop from "./components/Shop";
import About from "./components/About";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import SingleProduct from "./components/SingleProduct";
import { CartProvider } from "./components/context/CartContext";
import Login from "./components/Login";
import { AuthProvider } from "./components/context/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <CartProvider>
          <AuthProvider>
            <NavBar />
            <Switch>
              <Route path="/" title="Home Page" exact component={Home} />
              <Route path="/shop" title="Shop Page" exact component={Shop} />
              <Route
                path="/shop/:id"
                title="Product"
                component={SingleProduct}
              />
              <Route path="/about" title="About Page" component={About} />
              <Route path="/cart" title="Cart" component={Cart} />
              <Route path="/login" title="Login" component={Login} />
              <Route title=" Not Found " component={NotFound} />
            </Switch>
          </AuthProvider>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
