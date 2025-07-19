import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Sending confirmation...");
  const [countdown, setCountdown] = useState(5);
  const hasRun = useRef(false);
  const emailSent = useRef(false);

  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session_id");

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const redirectTimer = () => {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/");
          }
          return prev - 1;
        });
      }, 1000);
    };

    if (!sessionId) {
      setStatus("Missing session ID. Redirecting...");
      redirectTimer();
      return;
    }

    const fetchSessionAndSendEmail = async () => {
      try {
        const sessionRes = await axios.get(
          `${BACKEND_URL}/payment/session/${sessionId}`
        );
        const { email, productId, paymentId } = sessionRes.data;

        if (email && productId && paymentId) {
          // Avoid duplicate email sends
          if (!emailSent.current) {
            emailSent.current = true;

            await emailjs.send(
              import.meta.env.VITE_EMAILJS_SERVICE_ID,
              import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
              {
                user_email: email,
                product_id: productId,
                payment_id: paymentId,
              },
              import.meta.env.VITE_EMAILJS_USER_ID
            );

            setStatus("Email sent successfully! Redirecting in 5 seconds...");
          }
        } else {
          setStatus("Missing email or product info. Redirecting...");
        }
      } catch (err) {
        console.error("Error fetching session or sending email:", err);
        setStatus("Failed to send email. Redirecting...");
      }

      redirectTimer();
    };

    fetchSessionAndSendEmail();
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-green-800 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful</h1>
      <p className="mb-2">{status}</p>
      <p className="mb-6">Redirecting in {countdown} seconds...</p>
      <a
        href="/"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Back to Home
      </a>
    </div>
  );
}
