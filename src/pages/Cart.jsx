function Cart({ cart, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div className="cart__item" key={index}>
            <img src={item.image} alt={item.title} />
            <div>
              <p>{item.title}</p>
              <p>₹{item.price}</p>
              <button onClick={() => removeFromCart(index)}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}

export default Cart;
