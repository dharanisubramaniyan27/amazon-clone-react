import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkout } from "../services/api";
import "./Checkout.css";

function Checkout({ cart, clearCart }) {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        card: "4242 4242 4242 4242",
        expiry: "12/26",
        cvv: "123",
    });

    const handlePay = async (e) => {
        e.preventDefault();
        if (!userId) return alert("Please login to complete purchase");

        setLoading(true);
        try {
            await checkout(userId, total);
            alert("Payment Successful! Thank you for your purchase.");
            clearCart();
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Payment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout">
            <div className="checkout__container">
                <h2>Checkout</h2>
                <p>Order Total: <strong>₹{total}</strong></p>

                <form onSubmit={handlePay}>
                    <div className="checkout__section">
                        <h3>Delivery Address</h3>
                        <textarea placeholder="Line 1, Line 2, City, State, ZIP" required />
                    </div>

                    <div className="checkout__section">
                        <h3>Payment Method (Dummy)</h3>
                        <div className="checkout__card">
                            <input
                                type="text"
                                placeholder="Name on Card"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <input type="text" placeholder="Card Number" value={formData.card} disabled />
                            <div className="checkout__cardInfo">
                                <input type="text" placeholder="MM/YY" value={formData.expiry} disabled />
                                <input type="text" placeholder="CVV" value={formData.cvv} disabled />
                            </div>
                        </div>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Processing..." : `Pay ₹${total}`}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Checkout;
