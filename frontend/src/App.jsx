import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import HomePage from './pages/homePage';
import CategoryPage from './pages/categoryPage';
import SubCategoryPage from './pages/sub-categoryPage';
import ProductDetailsPage from './pages/product-deatailsPage';
import CartPage from './pages/cartPage';
import AboutPage from './pages/aboutPage';
import ContactPage from './pages/contactPage';
import AllProductsPage from './pages/all-products';
import CartProvider from './context/CartProvider';
import AuthProvider from './context/AuthProvider';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import ForgotPasswordPage from './pages/forgotPasswordPage';
import AdminRoute from './admin/AdminRoute';
import AdminDashboard from './admin/AdminDashboard';
import AdminCategoriesPage from './admin/AdminCategoriesPage';
import AdminProductsPage from './admin/AdminProductsPage';
import AdminOrdersPage from './admin/AdminOrdersPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/"                          element={<HomePage />} />
            <Route path="/categories"                element={<CategoryPage />} />
            <Route path="/categories/:id"            element={<SubCategoryPage />} />
            <Route path="/product/:productId"        element={<ProductDetailsPage />} />
            <Route path="/product/:catId/:productId" element={<ProductDetailsPage />} />
            <Route path="/cart"                      element={<CartPage />} />
            <Route path="/about"                     element={<AboutPage />} />
            <Route path="/contact"                   element={<ContactPage />} />
            <Route path="/all-products"              element={<AllProductsPage />} />
            <Route path="/login"                     element={<LoginPage />} />
            <Route path="/register"                  element={<RegisterPage />} />
            <Route path="/forgot-password"           element={<ForgotPasswordPage />} />
            <Route path="/admin" element={<AdminRoute />}>
              <Route index element={<AdminDashboard />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
            </Route>
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
