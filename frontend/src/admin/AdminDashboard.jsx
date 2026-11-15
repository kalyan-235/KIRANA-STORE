import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminOrders, getCategories, getProducts } from '../services/api';
import { useAuth } from '../context/useAuth';

const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      getCategories(),
      getProducts({ limit: 1 }),
      getAdminOrders(token),
    ])
      .then(([categories, products, orders]) => setStats({
        categories: categories.length,
        products: products.total,
        orders: orders.length,
        pending: orders.filter((order) => order.orderStatus === 'Placed').length,
      }))
      .catch((requestError) => setError(requestError.message));
  }, [token]);

  return (
    <div>
      <div className="admin-page-heading">
        <div><p className="admin-eyebrow">OVERVIEW</p><h1>Dashboard</h1><p>Store activity at a glance.</p></div>
      </div>
      {error && <div className="admin-alert error" role="alert">{error}</div>}
      {!stats && !error && <p className="admin-state">Loading dashboard…</p>}
      {stats && (
        <>
          <div className="admin-stats-grid">
            <article className="admin-stat"><span>Categories</span><strong>{stats.categories}</strong><Link to="/admin/categories">Manage categories →</Link></article>
            <article className="admin-stat"><span>Products</span><strong>{stats.products}</strong><Link to="/admin/products">Manage products →</Link></article>
            <article className="admin-stat"><span>Total orders</span><strong>{stats.orders}</strong><Link to="/admin/orders">View orders →</Link></article>
            <article className="admin-stat"><span>New orders</span><strong>{stats.pending}</strong><Link to="/admin/orders">Process orders →</Link></article>
          </div>
          <section className="admin-panel admin-welcome">
            <h2>Welcome to your store dashboard</h2>
            <p>Create categories, upload product images to Cloudinary, keep inventory updated, and process customer orders.</p>
          </section>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
