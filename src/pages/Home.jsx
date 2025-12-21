import ProductCard from "../components/ProductCard";
import "./Home.css";

function Home({ products, addToCart }) {
  return (
    <div className="home">
      <div className="home__row">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
