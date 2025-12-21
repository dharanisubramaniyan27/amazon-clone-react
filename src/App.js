import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <>
      <Header cartCount={cart.length} />
      <Home addToCart={addToCart} />
      <Cart cart={cart} removeFromCart={removeFromCart} />
    </>
  );
}

export default App;
