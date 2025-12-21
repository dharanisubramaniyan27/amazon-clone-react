import products from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home__row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
