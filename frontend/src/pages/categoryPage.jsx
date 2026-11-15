import React, { useEffect, useMemo, useState } from 'react';
import CategoryHeader from '../components/category-components/CategoryHeader';
import CategoryGrid   from '../components/category-components/CategoryGrid';
import { getCategories } from '../services/api';
import '../styles/categorypage.css';

const CategoryPage = () => {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data.map((category) => ({
        ...category,
        id: category._id,
        sub: category.subcategories.map((subcategory) => subcategory.name),
      }))))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoaded(true));
  }, []);

  const filtered = useMemo(() => categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  ), [categories, search]);

  return (
    <main className="cat-page">
      <CategoryHeader
        search={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {error ? <p role="alert">{error}</p> : null}
      {!error && !loaded ? <p>Loading categories...</p> : null}
      <section className="cat-grid-section">
        <div className="cat-grid-container">
          <CategoryGrid categories={filtered} search={search} />
        </div>
      </section>
    </main>
  );
};

export default CategoryPage;
