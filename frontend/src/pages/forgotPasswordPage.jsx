import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = (event) => {
    event.preventDefault();
    setMessage('Password-reset email is not configured yet. Please contact store support to recover your account.');
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <span className="auth-icon">🔐</span>
        <h1>Forgot password?</h1>
        <p>Enter your account email to see recovery options.</p>
        {message && <div className="admin-alert" role="status">{message}</div>}
        <label>Email<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <button className="admin-primary auth-submit">Continue</button>
        <p className="auth-switch"><Link to="/login">← Back to sign in</Link></p>
      </form>
    </main>
  );
};

export default ForgotPasswordPage;
