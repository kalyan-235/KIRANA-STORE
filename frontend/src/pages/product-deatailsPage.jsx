import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getProduct,
  getRelatedProducts as fetchRelatedProducts,
} from '../services/api';
import { imageUrl } from '../services/imageUrl';
import { useCart } from '../context/useCart';

import PDBreadcrumb      from '../components/product-detail-components/PDBreadcrumb';
import PDImageGallery    from '../components/product-detail-components/PDImageGallery';
import PDProductInfo     from '../components/product-detail-components/PDProductInfo';
import PDProductSidebar  from '../components/product-detail-components/PDProductSidebar';
import PDRelatedProducts from '../components/product-detail-components/PDRelatedProducts';
import '../styles/product-deatailsPage.css';

const ProductDetailsPage = () => {
  const { addToCart } = useCart();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loadedProductId, setLoadedProductId] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState('');
  const [relatedError, setRelatedError] = useState('');
  const [activeImg, setActiveImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [cartMsg, setCartMsg] = useState('');

  useEffect(() => {
    let active = true;
    getProduct(productId)
      .then((data) => {
        if (!active) return;
        setProduct(data);
        setError('');
        setRelatedProducts([]);
        setRelatedError('');
        setActiveImg(0);
        setSelectedVariant(0);
        setQty(1);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoadedProductId(productId);
      });
    return () => { active = false; };
  }, [productId]);

  useEffect(() => {
    if (!product?._id || product._id !== productId) return undefined;
    let active = true;
    fetchRelatedProducts(product._id)
      .then((products) => {
        if (active) setRelatedProducts(products.map((item) => ({ ...item, id: item._id })));
      })
      .catch((requestError) => {
        if (active) setRelatedError(requestError.message);
      });
    return () => { active = false; };
  }, [product?._id, productId]);

  const pd = useMemo(() => {
    if (!product) return null;
    const category = product.category;
    const subcategory = category?.subcategories?.find((item) => item.id === product.subcat);
    const img = product.img || category?.img || imageUrl('/hero-image.png');
    return {
      ...product,
      id: product._id,
      catId: category?._id,
      catName: category?.name || '',
      subcatName: subcategory?.name || product.subcat,
      category: category?.name || '',
      type: subcategory?.name || product.type || '',
      img,
      images: product.images?.length ? product.images : [img],
      features: product.features || [],
      variants: product.variants?.length
        ? product.variants
        : [{ label: product.weight, original: product.original, price: product.price, discount: product.discount }],
    };
  }, [product]);

  if (loadedProductId !== productId) return <p>Loading product...</p>;

  if (error || !pd) {
    return (
      <div className="pd-not-found">
        <span>😕</span>
        <h2>{error || 'Product not found'}</h2>
        <Link to="/categories" className="pd-back-btn">← Back to Categories</Link>
      </div>
    );
  }

  const variant = pd.variants[selectedVariant] || pd.variants[0];
  const handleVariantChange = (index) => { setSelectedVariant(index); setQty(1); };
  const handleAddToCart = () => {
    addToCart(pd, qty, variant);
    setCartMsg(`✅ Added ${qty} × ${pd.name} (${variant.label}) to cart!`);
    setTimeout(() => setCartMsg(''), 3000);
  };

  return (
    <main className="pd-page">
      <PDBreadcrumb
        catId={pd.catId}
        catName={pd.catName}
        subcatName={pd.subcatName}
        productName={pd.name}
      />
      <section className="pd-main">
        <div className="pd-container">
          <PDImageGallery
            images={pd.images}
            activeImg={activeImg}
            onThumbClick={setActiveImg}
            discount={variant.discount}
            productName={pd.name}
          />
          <PDProductInfo
            pd={pd}
            variant={variant}
            selectedVariant={selectedVariant}
            qty={qty}
            cartMsg={cartMsg}
            onVariantChange={handleVariantChange}
            onQtyIncrease={() => setQty((current) => current + 1)}
            onQtyDecrease={() => setQty((current) => Math.max(1, current - 1))}
            onAddToCart={handleAddToCart}
          />
          <PDProductSidebar
            features={pd.features}
            brand={pd.brand}
            type={pd.type}
            category={pd.category}
            shelfLife={pd.shelfLife}
            variantLabel={variant.label}
          />
        </div>
      </section>
      <PDRelatedProducts
        relatedProducts={relatedProducts}
        catId={pd.catId}
        catImg={pd.img}
      />
      {relatedError ? <p role="alert">{relatedError}</p> : null}
    </main>
  );
};

export default ProductDetailsPage;
