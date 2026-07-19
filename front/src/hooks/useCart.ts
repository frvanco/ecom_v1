'use client';

import { useState, useEffect } from 'react';
import { Cart } from '@/types';
import api from '@/lib/api';

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      setCart(res.data);
    } catch {
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) fetchCart();
    else setLoading(false);
  }, []);

  const addToCart = async (productId: string, quantity: number) => {
    await api.post('/cart/items', { productId, quantity });
    await fetchCart();
  };

  const updateItem = async (productId: string, quantity: number) => {
    await api.patch(`/cart/items/${productId}`, { quantity });
    await fetchCart();
  };

  const removeItem = async (productId: string) => {
    await api.delete(`/cart/items/${productId}`);
    await fetchCart();
  };

  const clearCart = async () => {
    await api.delete('/cart');
    await fetchCart();
  };

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const total = cart?.items.reduce(
    (sum, item) => sum + Number(item.unitPriceSnapshot) * item.quantity,
    0,
  ) ?? 0;

  return { cart, loading, addToCart, updateItem, removeItem, clearCart, itemCount, total };
}