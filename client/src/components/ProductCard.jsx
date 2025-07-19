const ProductCard = ({ product, onBuy }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {product.name}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">${product.price}</p>
      <button
        onClick={() => onBuy(product)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
