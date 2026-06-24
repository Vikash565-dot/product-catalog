import { useEffect, useState } from "react";
import { api } from "./api";
import ProductCard from "./ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [category, setCategory] = useState("");

  const loadProducts = async (next = null) => {
    let url = "/products";

    const params = [];

    if (category) {
      params.push(`category=${category}`);
    }

    if (next) {
      params.push(`cursor=${encodeURIComponent(next)}`);
    }

    if (params.length) {
      url += `?${params.join("&")}`;
    }

    const res = await api.get(url);

    if (next) {
      setProducts((prev) => [...prev, ...res.data.products]);
    } else {
      setProducts(res.data.products);
    }

    setCursor(res.data.nextCursor);
  };

  useEffect(() => {
    loadProducts();
  }, [category]);

  return (
    <div style={{ maxWidth: 900, margin: "auto" }}>
      <h1>Products</h1>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Books">Books</option>
        <option value="Fashion">Fashion</option>
        <option value="Sports">Sports</option>
        <option value="Home">Home</option>
        <option value="Beauty">Beauty</option>
        <option value="Toys">Toys</option>
      </select>

      <br />
      <br />

      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
        />
      ))}

      {cursor && (
        <button onClick={() => loadProducts(cursor)}>
          Load More
        </button>
      )}
    </div>
  );
}

export default App;