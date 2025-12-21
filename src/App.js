import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const products = [
  {
    id: 1,
    title: "Apple iPhone 15 (128 GB) - Black",
    price: 79999,
    image: "https://m.media-amazon.com/images/I/71657TiFeHL._SX679_.jpg",
    rating: 5,
  },
  {
  id: 2,
  title: "HP 15s Laptop (16GB RAM, 512GB SSD)",
  price: 58999,
  image: "https://m.media-amazon.com/images/I/71S8U9VzLTL._SL1500_.jpg",
  rating: 4,
},
  {
    id: 3,
    title: "boAt Rockerz 255 Pro+ Bluetooth Earphones",
    price: 1299,
    image: "https://m.media-amazon.com/images/I/61KNJav3S9L._SX679_.jpg",
    rating: 4,
  },
];


  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <Header cartCount={cart.length} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={<Home products={products} addToCart={addToCart} />}
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetail products={products} addToCart={addToCart} />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart cart={cart} removeFromCart={removeFromCart} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
