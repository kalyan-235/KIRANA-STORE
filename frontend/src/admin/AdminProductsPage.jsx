import React, { useCallback, useEffect, useState } from 'react';
import { createProduct, deleteProduct, getCategories, getProducts, updateProduct } from '../services/api';
import { useAuth } from '../context/useAuth';
import AdminImageUpload from './AdminImageUpload';

const initialForm = {
  category: '', subcat: '', name: '', variants: [{ label: '', original: '', price: '' }],
  inStock: true, img: '', brand: '', shelfLife: '12 Months', description: '',
  rating: '4', reviews: '0', features: '',
};

const calculateDiscount = (original, price) => {
  const originalPrice = Number(original);
  const salePrice = Number(price);
  if (!Number.isFinite(originalPrice) || originalPrice <= 0 || !Number.isFinite(salePrice) || salePrice < 0 || salePrice > originalPrice) {
    return '';
  }
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

const parseVariants = (variants) => {
  const seenLabels = new Set();
  return variants.map((variant) => {
    const label = variant.label.trim();
    const labelKey = label.toLowerCase();
    if (!label || variant.original === '' || variant.price === '') {
      throw new Error('Add a weight/size, original price, and sale price for every option.');
    }

    const original = Number(variant.original);
    const price = Number(variant.price);
    if (!Number.isFinite(original) || original <= 0 || !Number.isFinite(price) || price < 0 || price > original) {
      throw new Error(`Enter valid prices for ${label}. Sale price cannot exceed original price.`);
    }
    if (seenLabels.has(labelKey)) throw new Error(`Duplicate weight/size: ${label}`);
    seenLabels.add(labelKey);

    return { label, original, price, discount: calculateDiscount(original, price) };
  });
};

const AdminProductsPage = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const selectedCategory = categories.find((category) => category._id === form.category);
  const selectedSubcategory = selectedCategory?.subcategories?.find((item) => item.id === form.subcat);

  const load = useCallback(async () => {
    try {
      const [categoryList, productResult] = await Promise.all([
        getCategories(),
        getProducts({ limit: 50 }),
      ]);
      setCategories(categoryList);
      setProducts(productResult.data);
      setError('');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const reset = () => { setEditingId(null); setForm(initialForm); };
  const edit = (product) => {
    setEditingId(product._id);
    setNotice('');
    const variants = product.variants?.length
      ? product.variants.map((variant) => ({
        label: variant.label || '',
        original: String(variant.original ?? ''),
        price: String(variant.price ?? ''),
      }))
      : [{
        label: product.weight || '',
        original: String(product.original ?? ''),
        price: String(product.price ?? ''),
      }];
    setForm({
      category: product.category?._id || product.category || '',
      subcat: product.subcat || '',
      name: product.name || '',
      variants,
      inStock: product.inStock,
      img: product.img || '',
      brand: product.brand || '',
      shelfLife: product.shelfLife || '',
      description: product.description || '',
      rating: String(product.rating ?? 4),
      reviews: String(product.reviews ?? 0),
      features: (product.features || []).join('\n'),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateVariant = (index, field, value) => {
    setForm((current) => ({
      ...current,
      variants: current.variants.map((variant, variantIndex) =>
        variantIndex === index ? { ...variant, [field]: value } : variant
      ),
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setNotice('');
    try {
      if (!selectedSubcategory) throw new Error('Select a valid subcategory for this product.');
      const variants = parseVariants(form.variants);
      const primaryVariant = variants[0];
      const data = {
        ...form,
        type: selectedSubcategory.name,
        weight: primaryVariant.label,
        original: primaryVariant.original,
        price: primaryVariant.price,
        discount: primaryVariant.discount,
        rating: Number(form.rating),
        reviews: Number(form.reviews),
        features: form.features.split('\n').map((item) => item.trim()).filter(Boolean),
        variants,
        images: form.img ? [form.img] : [],
      };
      if (editingId) await updateProduct(editingId, data, token);
      else await createProduct(data, token);
      setNotice(editingId ? 'Product updated.' : 'Product created.');
      reset();
      await load();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (product) => {
    if (!window.confirm(`Deactivate "${product.name}"?`)) return;
    setError('');
    setNotice('');
    try {
      await deleteProduct(product._id, token);
      setNotice('Product deactivated.');
      await load();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <div>
      <div className="admin-page-heading"><div><p className="admin-eyebrow">CATALOG</p><h1>Products</h1><p>Add products, prices, variants, stock and Cloudinary images.</p></div></div>
      {error && <div className="admin-alert error" role="alert">{error}</div>}
      {notice && <div className="admin-alert success" role="status">{notice}</div>}
      <form className="admin-panel admin-form" onSubmit={submit}>
        <h2>{editingId ? 'Edit product' : 'Add product'}</h2>
        <div className="admin-form-grid">
          <label>Category<select required value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value, subcat: '' })}><option value="">Select category</option>{categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}</select></label>
          <label>Subcategory<select required value={form.subcat} onChange={(event) => setForm({ ...form, subcat: event.target.value })}><option value="">Select subcategory</option>{selectedCategory?.subcategories?.filter((item) => item.id !== 'all').map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
          <label>Product name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
          <div className="admin-span-2 admin-variants-field">
            <div className="admin-variants-heading"><strong>Weight / size and prices</strong><span>Discount is calculated automatically.</span></div>
            {form.variants.map((variant, index) => (
              <div className="admin-variant-row" key={index}>
                <label>Weight / size<input required placeholder="500 ml" value={variant.label} onChange={(event) => updateVariant(index, 'label', event.target.value)} /></label>
                <label>Original price (₹)<input type="number" min="0.01" step="0.01" required value={variant.original} onChange={(event) => updateVariant(index, 'original', event.target.value)} /></label>
                <label>Sale price (₹)<input type="number" min="0" step="0.01" required value={variant.price} onChange={(event) => updateVariant(index, 'price', event.target.value)} /></label>
                <label>Discount (%)<input readOnly value={calculateDiscount(variant.original, variant.price)} placeholder="Auto" /></label>
                <button
                  type="button"
                  className="admin-secondary admin-remove-variant"
                  onClick={() => setForm((current) => ({
                    ...current,
                    variants: current.variants.filter((_, variantIndex) => variantIndex !== index),
                  }))}
                  disabled={form.variants.length === 1}
                  aria-label={`Remove ${variant.label || `weight/size option ${index + 1}`}`}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="admin-secondary admin-add-variant"
              onClick={() => setForm((current) => ({
                ...current,
                variants: [...current.variants, { label: '', original: '', price: '' }],
              }))}
            >
              + Add weight / size
            </button>
          </div>
          <label>Brand<input value={form.brand} onChange={(event) => setForm({ ...form, brand: event.target.value })} /></label>
          <label>Shelf life<input value={form.shelfLife} onChange={(event) => setForm({ ...form, shelfLife: event.target.value })} /></label>
          <label>Rating (0–5)<input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(event) => setForm({ ...form, rating: event.target.value })} /></label>
          <label>Review count<input type="number" min="0" value={form.reviews} onChange={(event) => setForm({ ...form, reviews: event.target.value })} /></label>
          <label className="admin-checkbox"><input type="checkbox" checked={form.inStock} onChange={(event) => setForm({ ...form, inStock: event.target.checked })} /> In stock</label>
          <label className="admin-span-2">Description<textarea rows="3" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
          <label className="admin-span-2">Features (one per line)<textarea rows="3" value={form.features} onChange={(event) => setForm({ ...form, features: event.target.value })} /></label>
          <div className="admin-span-2"><AdminImageUpload token={token} value={form.img} onChange={(img) => setForm({ ...form, img })} /></div>
        </div>
        <div className="admin-form-actions"><button className="admin-primary" disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save changes' : 'Create product'}</button>{editingId && <button type="button" className="admin-secondary" onClick={reset}>Cancel edit</button>}</div>
      </form>

      <section className="admin-panel">
        <div className="admin-panel-heading"><h2>Products</h2><button className="admin-secondary" type="button" onClick={load}>Refresh</button></div>
        {loading ? <p className="admin-state">Loading products…</p> : products.length === 0 ? <p className="admin-state">No products yet.</p> : (
          <div className="admin-table-wrap"><table className="admin-table">
            <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
            <tbody>{products.map((product) => (
              <tr key={product._id}>
                <td><span className="admin-product-cell">{product.img && <img className="admin-table-image" src={product.img} alt="" />}{product.name}<small>{product.weight}</small></span></td>
                <td>{product.category?.name || '—'}</td><td>₹{product.price}</td><td>{product.inStock ? 'In stock' : 'Out of stock'}</td>
                <td className="admin-row-actions"><button type="button" onClick={() => edit(product)}>Edit</button><button type="button" className="danger" onClick={() => remove(product)}>Deactivate</button></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </section>
    </div>
  );
};

export default AdminProductsPage;
