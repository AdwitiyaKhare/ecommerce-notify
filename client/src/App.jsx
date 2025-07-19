import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

const BACKEND_URL = "http://localhost:5000";

export default function App() {
  const [products] = useState([
    { id: "p1", name: "AI Course", price: 20 },
    { id: "p2", name: "ML Guide", price: 15 },
    { id: "p3", name: "E-book Bundle", price: 25 },
  ]);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/auth/me`, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogin = () => {
    window.open(`${BACKEND_URL}/auth/google`, "_self");
  };

  const handleLogout = () => {
    window.open(`${BACKEND_URL}/auth/logout`, "_self");
  };

  const handleBuy = async (product) => {
    if (!user) return alert("Please login first");
    try {
      const res = await axios.post(
        `${BACKEND_URL}/payment/create-checkout-session`,
        {
          productId: product.id,
          price: product.price,
          email: user.email,
        },
        { withCredentials: true }
      );
      window.location.href = res.data.url;
    } catch (err) {
      alert("Error creating checkout session");
    }
  };

  return (
    <div
      className={
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }
    >
      <div className="min-h-screen px-6 py-10 max-w-6xl mx-auto transition-colors duration-300">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  user={user}
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
                <ProductList products={products} onBuy={handleBuy} />
                <Footer />
              </>
            }
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </div>
  );
}
