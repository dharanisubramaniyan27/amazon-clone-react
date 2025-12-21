function ProductCard({ product, addToCart }) {
  return (
    <div className="product">
      ...
      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
