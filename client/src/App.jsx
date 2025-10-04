import { useEffect, useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import AdminDashboard from "./pages/AdminDashboard";
import LoadingScreen from "./components/LoadingScreen";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log(BACKEND_URL);

export default function App() {
  const [products] = useState([
    { id: "p1", name: "AI Course", price: 20 },
    { id: "p2", name: "ML Guide", price: 15 },
    { id: "p3", name: "E-book Bundle", price: 25 },
  ]);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loadingBackend, setLoadingBackend] = useState(true);

  useEffect(() => {
    let isMounted = true; // to prevent setting state after unmount

    const wakeBackend = async () => {
      try {
        // Step 1: Ping the backend with timeout
        const res = await axios.get(`${BACKEND_URL}/auth/ping`, {
          timeout: 1000,
        });

        // ✅ Optional improvement: check backend response explicitly
        if (res.status === 200 && res.data.status === "ok") {
          if (!isMounted) return;

          // Step 2: Check if user is logged in (may fail)
          try {
            const userRes = await axios.get(`${BACKEND_URL}/auth/me`, {
              withCredentials: true,
            });
            if (!isMounted) return;
            setUser(userRes.data);
          } catch (userErr) {
            // User not logged in — backend is awake, that's fine
            setUser(null);
          }

          // Backend is awake, stop loading and remove Snake game
          if (!isMounted) return;
          setLoadingBackend(false);
        } else {
          // Backend responded but not as expected, retry
          setTimeout(wakeBackend, 1000);
        }
      } catch (err) {
        // Ping failed → backend still sleeping, retry
        setTimeout(wakeBackend, 1000); // retry every 1 second until backend responds
      }
    };

    wakeBackend();

    return () => {
      isMounted = false; // cleanup on unmount
    };
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

  if (loadingBackend) {
    return <LoadingScreen />;
  }

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
          <Route
            path="/admin-dashboard"
            element={<AdminDashboard user={user} />}
          />
        </Routes>
      </div>
    </div>
  );
}
