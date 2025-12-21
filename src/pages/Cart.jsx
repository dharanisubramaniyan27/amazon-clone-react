import "./Cart.css";

function Cart({ cart, removeFromCart }) {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
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
    <p>₹{item.price}</p>

    <button onClick={() => removeFromCart(item.id)}>
      Remove
    </button>
  </div>
</div>
        ))
      )}
    </div>
  );
}

export default Cart;
