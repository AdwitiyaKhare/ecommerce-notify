import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cancel() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-800 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
      <p className="mb-2">Your payment was not completed.</p>
      <p className="mb-6">Redirecting in {countdown} seconds...</p>
      <a
        href="/"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Try Again
      </a>
    </div>
  );
}
