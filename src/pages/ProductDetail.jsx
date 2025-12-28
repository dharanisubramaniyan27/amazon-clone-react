import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReviews, addReview } from "../services/api";
import "./ProductDetail.css";

function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (product) {
      getReviews(product.id).then(setReviews);
    }
  }, [product]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("Please login to leave a review");

    try {
      await addReview(product.id, userId, rating, comment);
      setComment("");
      const updatedReviews = await getReviews(product.id);
      setReviews(updatedReviews);
      alert("Review added!");
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) {
    return (
      <div className="productDetail">
        <h2>Product not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="productDetail">
      <Link to="/" className="productDetail__backLink">Back to Home</Link>

      <div className="productDetail__container">
        <div className="productDetail__left">
          <img
            src={product.image || "https://via.placeholder.com/250x250?text=No+Image"}
            alt={product.title}
          />
        </div>

        <div className="productDetail__info">
          <h2>{product.title}</h2>
          <p className="productDetail__price">Price: <span>₹{product.price}</span></p>
          <p>Rating: {product.rating} ⭐</p>
          <button type="button" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="productDetail__reviews">
        <h3>Customer Reviews</h3>

        {userId ? (
          <form className="productDetail__reviewForm" onSubmit={handleReviewSubmit}>
            <h4>Leave a Review</h4>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="5">5 ⭐⭐⭐⭐⭐</option>
              <option value="4">4 ⭐⭐⭐⭐</option>
              <option value="3">3 ⭐⭐⭐</option>
              <option value="2">2 ⭐⭐</option>
              <option value="1">1 ⭐</option>
            </select>
            <textarea
              placeholder="Your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button type="submit">Submit Review</button>
          </form>
        ) : (
          <p><Link to="/login">Login</Link> to write a review</p>
        )}

        <div className="productDetail__reviewsList">
          {reviews.length === 0 ? <p>No reviews yet.</p> : reviews.map(r => (
            <div key={r.id} className="productDetail__reviewItem">
              <p><strong>{r.email}</strong> - {r.rating} ⭐</p>
              <p>{r.comment}</p>
              <small>{new Date(r.created_at).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
