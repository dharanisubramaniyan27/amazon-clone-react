import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import { getProducts, getCart, addToCart as addToCartAPI, removeFromCart as removeFromCartAPI } from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const initData = async () => {
      try {
        const productData = await getProducts();
        setProducts(productData);

        if (userId) {
          const cartData = await getCart(userId);
          setCart(cartData);
        }
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, [userId]);

  const addToCart = async (product) => {
    const pId = product.id || product.product_id;

    if (userId) {
      try {
        await addToCartAPI(userId, pId, 1);
        const updatedCart = await getCart(userId);
        setCart(updatedCart);
      } catch (err) {
        console.error("Add to cart error:", err);
      }
    } else {
      const found = cart.find((item) => (item.id === pId || item.product_id === pId));
      if (found) {
        setCart(
          cart.map((item) =>
            (item.id === pId || item.product_id === pId)
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        );
      } else {
        setCart([...cart, { ...product, id: pId, qty: 1 }]);
      }
    }
  };

  const removeFromCart = async (id) => {
    if (userId) {
      try {
        await removeFromCartAPI(userId, id);
        const updatedCart = await getCart(userId);
        setCart(updatedCart);
      } catch (err) {
        console.error("Remove from cart error:", err);
      }
    } else {
      setCart(
        cart
          .map((item) =>
            (item.id === id || item.product_id === id)
              ? { ...item, qty: item.qty - 1 }
              : item
          )
          .filter((item) => item.qty > 0)
      );
    }
  };

  const clearCart = () => setCart([]);

  if (loading) return <div>Loading Amazon...</div>;

  return (
    <Router>
      <Header cartCount={cart.reduce((acc, item) => acc + item.qty, 0)} />
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
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout cart={cart} clearCart={clearCart} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
