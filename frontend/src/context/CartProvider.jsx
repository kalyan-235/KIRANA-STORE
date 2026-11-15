import React, { useEffect, useMemo, useState } from 'react';
import CartContext from './cartContext';

const STORAGE_KEY = 'kirana-store-cart';

const getInitialCart = () => {
  try {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Unable to load saved cart:', error);
    return [];
  }
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getInitialCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Unable to save cart:', error);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1, variant) => {
    if (!product?._id || !Number.isInteger(quantity) || quantity < 1) return;

    const selectedVariant = variant || {
      label: product.weight,
      price: product.price,
      original: product.original,
      discount: product.discount,
    };
    const key = `${product._id}:${selectedVariant.label}`;

    setCartItems((currentItems) => {
      const existing = currentItems.find((item) => item.key === key);
      if (existing) {
        return currentItems.map((item) =>
          item.key === key ? { ...item, qty: item.qty + quantity } : item
        );
      }

      return [...currentItems, {
        key,
        productId: product._id,
        name: product.name,
        img: product.img,
        weight: selectedVariant.label,
        price: selectedVariant.price,
        original: selectedVariant.original,
        discount: selectedVariant.discount ?? product.discount ?? 0,
        qty: quantity,
      }];
    });
  };

  const increaseQty = (key) => setCartItems((currentItems) =>
    currentItems.map((item) => item.key === key ? { ...item, qty: item.qty + 1 } : item)
  );

  const decreaseQty = (key) => setCartItems((currentItems) =>
    currentItems.map((item) =>
      item.key === key ? { ...item, qty: Math.max(1, item.qty - 1) } : item
    )
  );

  const removeItem = (key) => setCartItems((currentItems) =>
    currentItems.filter((item) => item.key !== key)
  );

  const itemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.qty, 0),
    [cartItems]
  );

  const value = useMemo(() => ({
    cartItems,
    itemCount,
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
  }), [cartItems, itemCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
