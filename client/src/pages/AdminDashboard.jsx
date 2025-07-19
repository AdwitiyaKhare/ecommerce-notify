import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

const AdminDashboard = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    axios
      .get(`${BACKEND_URL}/admin/orders`, { withCredentials: true })
      .then((res) => setOrders(res.data))
      .catch((err) => {
        setError(
          err.response?.data?.error ||
            "Failed to fetch orders. You may not be authorized."
        );
      });
  }, [user]);

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow-md border">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">User Email</th>
                <th className="px-4 py-2 text-left">Product ID</th>
                <th className="px-4 py-2 text-left">Payment ID</th>
                <th className="px-4 py-2 text-left">Purchased At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="px-4 py-2">{order.userEmail}</td>
                  <td className="px-4 py-2">{order.productId}</td>
                  <td className="px-4 py-2">{order.paymentId}</td>
                  <td className="px-4 py-2">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && <p className="mt-4">No orders yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
