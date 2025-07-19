# 🛍️ Full Stack E-Commerce App (React + Node.js)

A full-stack e-commerce platform where users can browse and buy digital products. It uses **Google OAuth** for login, **Stripe** for payments, **MongoDB** to store orders, and **EmailJS** to send confirmation emails upon successful checkout.

---

## 🧠 Features

- 🛒 Browse and purchase digital products
- 🔐 Google OAuth login
- 💳 Stripe checkout
- 📬 Confirmation email via EmailJS
- 🌙 Light/dark theme toggle
- 🔁 Auto-redirect on success or cancel

---

## 📸 App Screenshots

![Home Light Mode](./screenshots/home-light.png)
![Home Dark Mode](./screenshots/home-dark.png)

![Payment Sucess](./screenshots/payment-success.png)
![Payment Cancelled](./screenshots/payment-cancelled.png)

---

## ⚙️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- EmailJS
- Stripe.js

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- Passport.js (Google OAuth)
- Stripe SDK

---

## 🗂️ Project Structure

```
project-root/
├── client/               # React Frontend
│   ├── components/       # Reusable UI components
│   ├── pages/            # Success & Cancel pages
│   ├── App.jsx           # Main app
│   ├── main.jsx          # Entry point
│   └── index.css         # Tailwind config
├── server/               # Node.js Backend
│   ├── config/           # Passport setup
│   ├── models/           # Mongoose models
│   ├── routes/           # Auth, Payment, Admin APIs
│   ├── utils/            # Email sending util
│   ├── app.js            # Server entry
│   └── .env              # Environment file (ignored)
├── screenshots/          # 💡 Add UI screenshots here
└── README.md
```

---

## 🔐 Environment Variables

### 📁 `client/.env`

```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_USER_ID=your_emailjs_user_id
```

### 📁 `server/.env`

```env
PORT=5000
CLIENT_URL=http://localhost:5173

MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_USER_ID=your_emailjs_user_id

ADMIN_EMAILS=admin1@example.com,admin2@example.com
```

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app
```

### 2. Backend Setup

```bash
cd server
npm install
npm run dev
```

> ⚠️ Make sure MongoDB is running locally or use MongoDB Atlas.

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

The frontend will run at [http://localhost:5173](http://localhost:5173)

---

## ⚡ Stripe Webhook Setup (Optional)

If you want backend to automatically store orders on successful Stripe payments:

```bash
stripe listen --forward-to localhost:5000/webhook
```

> Requires Stripe CLI. This will enable webhook listener to insert orders into MongoDB.

---

## 🔐 Admin Access (View Orders)

To access `/admin/orders`, make sure your email is included in:

```env
ADMIN_EMAILS=admin1@example.com,admin2@example.com
```

Only listed emails will be able to view the order list.

---

## 💡 Next Steps / Enhancements

- Add product images and descriptions
- Show user’s past purchases
- Admin dashboard UI to manage orders
- Deployment on Vercel (client) + Render (server) + MongoDB Atlas
- Add product management (CRUD)

---

## 🧑‍💻 Developer Info

Built by [Adwitiya Khare](https://adwitiyakhare.vercel.dev)  
View the GitHub repository: [AdwitiyaKhare/ecommerce-notify](https://github.com/AdwitiyaKhare/ecommerce-notify)

---
