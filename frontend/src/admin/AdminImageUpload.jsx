import React, { useState } from 'react';
import { uploadCatalogImage } from '../services/api';

const AdminImageUpload = ({ token, value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const result = await uploadCatalogImage(file, token);
      onChange(result.url);
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className="admin-image-field">
      <label>Product image (JPEG, PNG or WebP, max 5 MB)
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} disabled={uploading} />
      </label>
      {uploading && <span>Uploading image…</span>}
      {error && <span className="admin-field-error" role="alert">{error}</span>}
      {value && <img className="admin-image-preview" src={value} alt="Uploaded preview" />}
      <label>Image URL<input type="url" value={value || ''} onChange={(event) => onChange(event.target.value)} /></label>
    </div>
  );
};

export default AdminImageUpload;
