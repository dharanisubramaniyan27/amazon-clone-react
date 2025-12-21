import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <>
      <Header cartCount={cart.length} />
      <Home addToCart={addToCart} />
    </>
  );
}

export default App;
