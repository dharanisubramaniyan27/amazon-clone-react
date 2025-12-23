import { useParams, Link } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

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
      <Link to="/">Back to Home</Link>

      <div className="productDetail__container">
        <img
  src={
    product.image
      ? product.image
      : "https://via.placeholder.com/250x250?text=No+Image"
  }
  alt={product.title}
/>

        <div className="productDetail__info">
          <h2>{product.title}</h2>
          <p>Price: ₹{product.price}</p>
          <p>Rating: {product.rating} ⭐</p>
          <button
  type="button"
  onClick={() => addToCart(product)}
>
  Add to Cart
</button>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
