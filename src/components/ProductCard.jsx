import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product">
      <img src={product.image} alt={product.title} />

      <div className="product__info">
        <p className="product__title">{product.title}</p>
        <p className="product__price">
          <strong>₹{product.price}</strong>
        </p>
        <div className="product__rating">
          {"⭐".repeat(product.rating)}
        </div>
      </div>

      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
