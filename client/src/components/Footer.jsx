const Footer = () => {
  return (
    <div className="mt-12 flex justify-center gap-6">
      <a
        href="https://github.com/yourusername/ecommerce-app"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded transition"
      >
        View Repository
      </a>
      <a
        href="https://adwitiyakhare.vercel.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded transition"
      >
        Developer's Portfolio
      </a>
    </div>
  );
};

export default Footer;
