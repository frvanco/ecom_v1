'use client';

import { useEffect, useState } from 'react';
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders')
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-32">
        <p className="text-[#6E6E73] font-light">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="bg-white max-w-[980px] mx-auto px-4 py-16">
      <h1 className="text-5xl font-thin text-[#1D1D1F] tracking-tight mb-16">
        Mes commandes
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-[#6E6E73] font-light text-xl mb-8">
            Vous n'avez pas encore de commande.
          </p>
          <Link
            href="/products"
            className="inline-block bg-[#0071E3] text-white text-sm px-6 py-3 rounded-full hover:bg-[#0077ED] transition-colors"
          >
            Découvrir le catalogue
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="bg-[#F5F5F7] rounded-2xl p-8 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[#6E6E73] font-light mb-1">
                    Commande #{order.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-lg font-light text-[#1D1D1F] mb-2">
                    {order.items.length} article{order.items.length > 1 ? 's' : ''}
                  </p>
                  <p className={`text-sm font-light ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-thin text-[#1D1D1F]">
                    {Number(order.total).toFixed(2)} €
                  </p>
                  <p className="text-xs text-[#6E6E73] font-light mt-1">
                    {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}