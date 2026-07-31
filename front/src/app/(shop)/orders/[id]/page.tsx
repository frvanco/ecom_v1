'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Order } from '@/types';
import api from '@/lib/api';

const statusLabels: Record<string, string> = {
  PENDING: 'En attente de paiement',
  PAID: 'Payée',
  FULFILLED: 'Expédiée',
  CANCELLED: 'Annulée',
};

const statusColors: Record<string, string> = {
  PENDING: 'text-orange-500',
  PAID: 'text-green-600',
  FULFILLED: 'text-blue-600',
  CANCELLED: 'text-red-500',
};

export default function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-32">
        <p className="text-[#6E6E73] font-light">Chargement...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-32">
        <p className="text-[#6E6E73] font-light text-xl">Commande introuvable.</p>
        <Link href="/orders" className="text-[#0071E3] text-sm mt-4 inline-block">
          Voir mes commandes
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white max-w-[980px] mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-16">
        <p className="text-sm text-[#6E6E73] font-light mb-2">Commande #{order.id.slice(-8).toUpperCase()}</p>
        <h1 className="text-5xl font-thin text-[#1D1D1F] tracking-tight mb-4">
          Merci pour votre commande.
        </h1>
        <p className={`text-sm font-light ${statusColors[order.status]}`}>
          {statusLabels[order.status]}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <h2 className="text-xl font-light text-[#1D1D1F]">Articles commandés</h2>
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-6 pb-8 border-b border-gray-200">
              <div className="bg-[#F5F5F7] rounded-xl w-20 h-20 flex-shrink-0 flex items-center justify-center overflow-hidden">
                {item.product.images?.length > 0 ? (
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-[#6E6E73]">—</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-light text-[#1D1D1F] mb-1">{item.product.name}</h3>
                <p className="text-sm text-[#6E6E73] font-light">Quantité : {item.quantity}</p>
                <p className="text-sm text-[#6E6E73] font-light">
                  {Number(item.unitPrice).toFixed(2)} € / unité
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-light text-[#1D1D1F]">
                  {(Number(item.unitPrice) * item.quantity).toFixed(2)} €
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé */}
        <div className="lg:col-span-1">
          <div className="bg-[#F5F5F7] rounded-2xl p-8">
            <h2 className="text-xl font-light text-[#1D1D1F] mb-6">Récapitulatif</h2>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between text-sm font-light text-[#6E6E73]">
                <span>Sous-total</span>
                <span>{Number(order.subtotal).toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm font-light text-[#6E6E73]">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-light text-[#1D1D1F]">
                <span>Total</span>
                <span>{Number(order.total).toFixed(2)} €</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-light text-[#1D1D1F] mb-3">Livraison à</h3>
              <p className="text-sm text-[#6E6E73] font-light leading-relaxed">
                {order.shippingName}<br />
                {order.shippingLine1}<br />
                {order.shippingLine2 && <>{order.shippingLine2}<br /></>}
                {order.shippingZip} {order.shippingCity}<br />
                {order.shippingCountry}
              </p>
            </div>
          </div>

          <Link
            href="/orders"
            className="block text-center text-sm text-[#0071E3] mt-6 hover:underline"
          >
            Voir toutes mes commandes
          </Link>
        </div>
      </div>
    </div>
  );
}