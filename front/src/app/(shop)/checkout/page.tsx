'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import api from '@/lib/api';

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    shippingName: '',
    shippingLine1: '',
    shippingLine2: '',
    shippingCity: '',
    shippingZip: '',
    shippingCountry: 'FR',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/orders', form);
      router.push(`/orders/${res.data.id}`);
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-32">
        <p className="text-[#6E6E73] font-light text-xl">Votre panier est vide.</p>
      </div>
    );
  }

  return (
    <div className="bg-white max-w-[980px] mx-auto px-4 py-16">
      <h1 className="text-5xl font-thin text-[#1D1D1F] tracking-tight mb-16">
        Finaliser la commande
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="text-xl font-light text-[#1D1D1F]">Adresse de livraison</h2>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            name="shippingName"
            placeholder="Nom complet"
            value={form.shippingName}
            onChange={handleChange}
            required
            className="w-full bg-[#F5F5F7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] font-light outline-none focus:ring-2 focus:ring-[#0071E3]"
          />
          <input
            name="shippingLine1"
            placeholder="Adresse"
            value={form.shippingLine1}
            onChange={handleChange}
            required
            className="w-full bg-[#F5F5F7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] font-light outline-none focus:ring-2 focus:ring-[#0071E3]"
          />
          <input
            name="shippingLine2"
            placeholder="Complément d'adresse (optionnel)"
            value={form.shippingLine2}
            onChange={handleChange}
            className="w-full bg-[#F5F5F7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] font-light outline-none focus:ring-2 focus:ring-[#0071E3]"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              name="shippingZip"
              placeholder="Code postal"
              value={form.shippingZip}
              onChange={handleChange}
              required
              className="w-full bg-[#F5F5F7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] font-light outline-none focus:ring-2 focus:ring-[#0071E3]"
            />
            <input
              name="shippingCity"
              placeholder="Ville"
              value={form.shippingCity}
              onChange={handleChange}
              required
              className="w-full bg-[#F5F5F7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] font-light outline-none focus:ring-2 focus:ring-[#0071E3]"
            />
          </div>
          <select
            name="shippingCountry"
            value={form.shippingCountry}
            onChange={handleChange}
            className="w-full bg-[#F5F5F7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] font-light outline-none focus:ring-2 focus:ring-[#0071E3]"
          >
            <option value="FR">France</option>
            <option value="BE">Belgique</option>
            <option value="CH">Suisse</option>
            <option value="LU">Luxembourg</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0071E3] text-white text-sm py-4 rounded-full hover:bg-[#0077ED] transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? 'Traitement...' : 'Confirmer la commande'}
          </button>
        </form>

        {/* Résumé */}
        <div className="lg:col-span-1">
          <div className="bg-[#F5F5F7] rounded-2xl p-8 sticky top-24">
            <h2 className="text-xl font-light text-[#1D1D1F] mb-6">Résumé</h2>
            <div className="flex flex-col gap-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm font-light text-[#6E6E73]">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>{(Number(item.unitPriceSnapshot) * item.quantity).toFixed(2)} €</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm font-light text-[#6E6E73]">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              <div className="flex justify-between text-lg font-light text-[#1D1D1F]">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}