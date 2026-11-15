import React, { useCallback, useEffect, useState } from 'react';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../services/api';
import { useAuth } from '../context/useAuth';
import AdminImageUpload from './AdminImageUpload';

const emptyForm = { name: '', tagline: '', emoji: '', img: '', heroBg: '', subcategories: '' };
const parseSubcategories = (value, existingSubcategories = []) => {
  const existingByName = new Map(existingSubcategories.map((item) => [item.name.trim().toLowerCase(), item]));
  const names = value.split('\n').map((line) => line.trim()).filter(Boolean);
  const seenNames = new Set();
  const seenIds = new Set();

  return names.map((name, index) => {
    const nameKey = name.toLowerCase();
    if (seenNames.has(nameKey)) throw new Error(`Duplicate subcategory name: ${name}`);
    seenNames.add(nameKey);

    const existing = existingByName.get(nameKey);
    let id = existing?.id || (/^all\s+/i.test(name)
      ? 'all'
      : name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    if (!id) id = `subcategory-${index + 1}`;
    if (seenIds.has(id)) {
      let suffix = 2;
      while (seenIds.has(`${id}-${suffix}`)) suffix += 1;
      id = `${id}-${suffix}`;
    }
    seenIds.add(id);

    return { id, name, emoji: existing?.emoji || '' };
  });
};

const AdminCategoriesPage = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    try {
      setCategories(await getCategories());
      setError('');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const reset = () => { setEditingId(null); setForm(emptyForm); };
  const edit = (category) => {
    setEditingId(category._id);
    setNotice('');
    setForm({
      name: category.name,
      tagline: category.tagline || '',
      emoji: category.emoji || '',
      img: category.img || '',
      heroBg: category.heroBg || '',
      subcategories: (category.subcategories || []).map((item) => item.name).join('\n'),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const existingCategory = categories.find((category) => category._id === editingId);
      const data = {
        ...form,
        subcategories: parseSubcategories(form.subcategories, existingCategory?.subcategories || []),
      };
      if (editingId) await updateCategory(editingId, data, token);
      else await createCategory(data, token);
      setNotice(editingId ? 'Category updated.' : 'Category created.');
      reset();
      await load();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (category) => {
    if (!window.confirm(`Deactivate "${category.name}"?`)) return;
    setError('');
    setNotice('');
    try {
      await deleteCategory(category._id, token);
      setNotice('Category deactivated.');
      await load();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <div>
      <div className="admin-page-heading"><div><p className="admin-eyebrow">CATALOG</p><h1>Categories</h1><p>Create or update store categories and subcategories.</p></div></div>
      {error && <div className="admin-alert error" role="alert">{error}</div>}
      {notice && <div className="admin-alert success" role="status">{notice}</div>}
      <form className="admin-panel admin-form" onSubmit={submit}>
        <h2>{editingId ? 'Edit category' : 'Add category'}</h2>
        <div className="admin-form-grid">
          <label>Category name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
          <label>Emoji<input value={form.emoji} onChange={(event) => setForm({ ...form, emoji: event.target.value })} /></label>
          <label className="admin-span-2">Tagline<input value={form.tagline} onChange={(event) => setForm({ ...form, tagline: event.target.value })} /></label>
          <label className="admin-span-2">Hero background (CSS)<input placeholder="linear-gradient(...)" value={form.heroBg} onChange={(event) => setForm({ ...form, heroBg: event.target.value })} /></label>
          <div className="admin-span-2"><AdminImageUpload token={token} value={form.img} onChange={(img) => setForm({ ...form, img })} /></div>
          <label className="admin-span-2">Subcategories (one name per line)
            <textarea rows="5" placeholder={'Organic Rice\nBasmati Rice'} value={form.subcategories} onChange={(event) => setForm({ ...form, subcategories: event.target.value })} />
          </label>
        </div>
        <div className="admin-form-actions">
          <button className="admin-primary" disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save changes' : 'Create category'}</button>
          {editingId && <button type="button" className="admin-secondary" onClick={reset}>Cancel edit</button>}
        </div>
      </form>

      <section className="admin-panel">
        <div className="admin-panel-heading"><h2>Active categories</h2><button className="admin-secondary" type="button" onClick={load}>Refresh</button></div>
        {loading ? <p className="admin-state">Loading categories…</p> : categories.length === 0 ? <p className="admin-state">No categories yet.</p> : (
          <div className="admin-table-wrap"><table className="admin-table">
            <thead><tr><th>Category</th><th>Subcategories</th><th>Image</th><th>Actions</th></tr></thead>
            <tbody>{categories.map((category) => (
              <tr key={category._id}>
                <td>{category.emoji} {category.name}</td>
                <td>{category.subcategories?.length || 0}</td>
                <td>{category.img ? <img className="admin-table-image" src={category.img} alt="" /> : '—'}</td>
                <td className="admin-row-actions"><button type="button" onClick={() => edit(category)}>Edit</button><button type="button" className="danger" onClick={() => remove(category)}>Deactivate</button></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </section>
    </div>
  );
};

export default AdminCategoriesPage;
