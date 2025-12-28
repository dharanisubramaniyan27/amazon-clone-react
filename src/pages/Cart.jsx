import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart({ cart, removeFromCart, addToCart }) {
  const navigate = useNavigate();
  // Total should account for quantity
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart">
      <div className="cart__left">
        <h2>Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div className="cart__item" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div className="cart__info">
                <h4>{item.title}</h4>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.qty}</p>

                <div className="cart__buttons">
                  <button type="button" onClick={() => removeFromCart(item.id)}>-</button>
                  <button type="button" onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart__right">
          <div className="cart__subtotal">
            <p>
              Subtotal ({cart.reduce((acc, item) => acc + item.qty, 0)} items):{" "}
              <strong>₹{total}</strong>
            </p>
            <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
