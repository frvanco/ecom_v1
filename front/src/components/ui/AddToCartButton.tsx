'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    if (product.stock === 0) return;
    setLoading(true);
    try {
      await addToCart(product.id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      // non connecté
      window.location.href = '/login';
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading || product.stock === 0}
      className="w-full bg-[#0071E3] text-white text-sm py-4 rounded-full hover:bg-[#0077ED] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Ajout...' : added ? 'Ajouté ✓' : product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
    </button>
  );
}