import "./Cart.css";

function Cart({ cart, removeFromCart, addToCart }) {
  // Total should account for quantity
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      <h3>Total: ₹{total}</h3>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div className="cart__item" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div className="cart__info">
              <h4>{item.title}</h4>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.qty}</p> {/* Show quantity */}

              <div className="cart__buttons">
                <button onClick={() => removeFromCart(item.id)}>-</button>
                <button onClick={() => addToCart(item)}>+</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
