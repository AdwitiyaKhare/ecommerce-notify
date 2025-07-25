import ProductCard from "./ProductCard";

const ProductList = ({ products, onBuy, user }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onBuy={onBuy} user={user} />
      ))}
    </div>
  );
};

export default ProductList;
