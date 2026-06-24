function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>{product.name}</h3>

      <p>{product.category}</p>

      <p>₹ {product.price}</p>
    </div>
  );
}

export default ProductCard;