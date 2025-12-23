import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product, addToCart }) {
  return (
    <div className="productCard">
      <img
  src={product.image}
  alt={product.title}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src =
      "https://via.placeholder.com/300x300?text=Image+Not+Available";
  }}
/>
      <Link to={`/product/${product.id}`}>
        <h4>{product.title}</h4>
      </Link>

      <p>₹{product.price}</p>

      <button type="button" onClick={() => addToCart(product)}>
  Add to Cart
</button>

    </div>
  );
}

export default ProductCard;
