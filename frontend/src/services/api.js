const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const request = async (path, { token, ...options } = {}) => {
  const headers = new Headers(options.headers || {});
  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || `Request failed (${response.status})`);
  }

  return result;
};

export const getCategories = async () => (await request('/categories')).data;
export const getCategory = async (id) => (await request(`/categories/${id}`)).data;
export const getProducts = async (params = {}) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );
  return request(`/products${query.size ? `?${query}` : ''}`);
};
export const getProductCounts = async () => request('/products/counts');
export const getProduct = async (id) => (await request(`/products/${id}`)).data;
export const getRelatedProducts = async (id) =>
  (await request(`/products/${id}/related`)).data;

export const login = async (credentials) =>
  (await request('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })).data;

export const register = async (details) =>
  (await request('/users/register', {
    method: 'POST',
    body: JSON.stringify(details),
  })).data;

export const createCategory = async (data, token) =>
  (await request('/categories', { method: 'POST', body: JSON.stringify(data), token })).data;
export const updateCategory = async (id, data, token) =>
  (await request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data), token })).data;
export const deleteCategory = async (id, token) =>
  request(`/categories/${id}`, { method: 'DELETE', token });

export const createProduct = async (data, token) =>
  (await request('/products', { method: 'POST', body: JSON.stringify(data), token })).data;
export const updateProduct = async (id, data, token) =>
  (await request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data), token })).data;
export const deleteProduct = async (id, token) =>
  request(`/products/${id}`, { method: 'DELETE', token });

export const getAdminOrders = async (token) =>
  (await request('/orders', { token })).data;
export const updateOrderStatus = async (id, status, token) =>
  (await request(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
    token,
  })).data;

export const uploadCatalogImage = async (file, token) => {
  const formData = new FormData();
  formData.append('image', file);
  return (await request('/uploads/image', {
    method: 'POST',
    body: formData,
    token,
  })).data;
};
