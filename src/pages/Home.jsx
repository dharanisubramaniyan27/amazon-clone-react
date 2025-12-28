import ProductCard from "../components/ProductCard";
import "./Home.css";

function Home({ products, addToCart }) {
  return (
    <div className="home">
      <div className="home__row">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <div className="home__noProducts">
            <h3>No products found matching your search.</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
