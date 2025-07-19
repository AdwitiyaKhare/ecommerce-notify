```markdown
# 🛍️ E-Commerce Frontend

A React-based frontend for a simple e-commerce store with integrated payment using Stripe and Google OAuth login. Users can browse products, buy them via Stripe Checkout, and receive confirmation emails via EmailJS.

---

## 🔥 Features

- Browse a list of digital products
- Google OAuth login
- Stripe checkout integration
- Email confirmation via EmailJS
- Responsive light/dark theme toggle
- Auto-redirect on success/cancel pages

---

## 🖥️ Preview

[Light Mode Screenshot](./screenshots/home-light.png)

[Dark Mode Screenshot](./screenshots/home-dark.png)

---

## 🛠️ Tech Stack

- **React (Vite)**
- **Tailwind CSS**
- **React Router**
- **EmailJS**
- **Stripe (frontend integration)**

---

## 📁 Project Structure

```

client/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   └── ProductList.jsx
├── pages/
│   ├── Success.jsx
│   └── Cancel.jsx
├── App.jsx
├── main.jsx
└── index.css

````

---

## ⚙️ Environment Variables

Create a `.env` file in the `client/` folder based on the following:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_emailjs_user_id
````

---

## 📦 Installation

```bash
cd client
npm install
npm run dev
```

---

````

---

### ✅ `server/README.md`

```markdown
# ⚙️ E-Commerce Backend (Node.js + Express)

This is the backend API server for the e-commerce app that supports:

- Google OAuth user authentication
- Stripe payments
- Order storage in MongoDB
- Admin access to order history

---

## 🧠 Features

- Secure Stripe checkout session creation
- MongoDB order persistence via Mongoose
- Admin-protected route to view all orders
- Google OAuth 2.0 login with Passport.js
- Stripe Webhook to store successful purchases
- CORS-enabled for frontend communication

---

## 🛠️ Tech Stack

- **Node.js + Express**
- **MongoDB + Mongoose**
- **Stripe SDK**
- **Passport.js (Google Strategy)**
- **EmailJS (sent from frontend)**

---

## 🧾 Project Structure

````

server/
├── config/
│   └── passport.js
├── models/
│   ├── Order.js
│   └── User.js
├── routes/
│   ├── auth.js
│   ├── admin.js
│   └── payment.js
├── utils/
│   └── sendEmail.js
├── app.js
└── .env

````

---

## ⚙️ Environment Variables

Create a `.env` file in the `server/` folder with the following:

```env
PORT=5000
CLIENT_URL=http://localhost:5173

MONGO_URI=your_mongo_connection_string
SESSION_SECRET=some_random_secret

GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_USER_ID=your_emailjs_user_id

ADMIN_EMAILS=admin1@example.com,admin2@example.com
````

---

## 📦 Installation

```bash
cd server
npm install
npm run dev
```

> Make sure MongoDB is running locally or connected via Atlas.

---

## ⚡ Webhook Setup (Optional for Local Testing)

If testing Stripe Webhooks locally, use:

```bash
stripe listen --forward-to localhost:5000/webhook
```

This ensures successful order storage on payment completion.

---