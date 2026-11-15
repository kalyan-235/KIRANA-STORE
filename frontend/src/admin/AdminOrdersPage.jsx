import React, { useCallback, useEffect, useState } from 'react';
import { getAdminOrders, updateOrderStatus } from '../services/api';
import { useAuth } from '../context/useAuth';

const statuses = ['Placed', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const AdminOrdersPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    try {
      setOrders(await getAdminOrders(token));
      setError('');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const changeStatus = async (order, status) => {
    setError('');
    setNotice('');
    try {
      await updateOrderStatus(order._id, status, token);
      setNotice(`Order ${order._id.slice(-6)} updated to ${status}.`);
      await load();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <div>
      <div className="admin-page-heading"><div><p className="admin-eyebrow">FULFILMENT</p><h1>Orders</h1><p>Review and update customer orders.</p></div></div>
      {error && <div className="admin-alert error" role="alert">{error}</div>}
      {notice && <div className="admin-alert success" role="status">{notice}</div>}
      <section className="admin-panel">
        <div className="admin-panel-heading"><h2>All orders ({orders.length})</h2><button className="admin-secondary" type="button" onClick={load}>Refresh</button></div>
        {loading ? <p className="admin-state">Loading orders…</p> : orders.length === 0 ? <p className="admin-state">No orders have been placed.</p> : (
          <div className="admin-table-wrap"><table className="admin-table">
            <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th></tr></thead>
            <tbody>{orders.map((order) => (
              <tr key={order._id}>
                <td><strong>#{order._id.slice(-6)}</strong><small>{new Date(order.createdAt).toLocaleString()}</small></td>
                <td>{order.user?.name || 'Customer'}<small>{order.user?.email}</small></td>
                <td>{order.items?.reduce((total, item) => total + item.qty, 0) || 0}</td>
                <td>₹{order.totalAmount}</td>
                <td>{order.paymentMethod}<small>{order.paymentStatus}</small></td>
                <td><select aria-label={`Status for order ${order._id}`} value={order.orderStatus} onChange={(event) => changeStatus(order, event.target.value)}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </section>
    </div>
  );
};

export default AdminOrdersPage;
