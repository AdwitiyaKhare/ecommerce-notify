import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export default async function sendEmail(userEmail, productId, paymentId) {
  const payload = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_USER_ID,
    template_params: {
      user_email: userEmail,
      product_id: productId,
      payment_id: paymentId,
    },
  };

  try {
    console.log("Sending email with:", payload);

    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const resultText = await response.text();

    if (!response.ok) {
      throw new Error(`EmailJS failed: ${resultText}`);
    }

    console.log("Email sent successfully:", resultText);
  } catch (err) {
    console.error("Failed to send email:", err.message);
  }
}
