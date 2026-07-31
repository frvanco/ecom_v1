'use client';

import { useCart } from '@/hooks/useCart';
import Link from 'next/link';

export default function CartPage() {
  const { cart, loading, updateItem, removeItem, total } = useCart();

  if (loading) {
    return (
      <div className="text-center py-32">
        <p className="text-[#6E6E73] font-light">Chargement...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-32">
        <h1 className="text-4xl font-thin text-[#1D1D1F] mb-4">Votre panier est vide.</h1>
        <p className="text-[#6E6E73] font-light mb-8">
          Découvrez nos produits et ajoutez-en à votre panier.
        </p>
        <Link
          href="/products"
          className="inline-block bg-[#0071E3] text-white text-sm px-6 py-3 rounded-full hover:bg-[#0077ED] transition-colors"
        >
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white max-w-[980px] mx-auto px-4 py-16">
      <h1 className="text-5xl font-thin text-[#1D1D1F] tracking-tight mb-16">
        Votre panier
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-6 pb-8 border-b border-gray-200">
              {/* Image */}
              <div className="bg-[#F5F5F7] rounded-xl w-24 h-24 flex-shrink-0 flex items-center justify-center overflow-hidden">
                {item.product.images.length > 0 ? (
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-[#6E6E73]">—</span>
                )}
              </div>

              {/* Infos */}
              <div className="flex-1">
                <p className="text-xs text-[#6E6E73] font-light mb-1">
                  {item.product.category?.name ?? ''}
                </p>
                <h3 className="text-lg font-light text-[#1D1D1F] mb-1">
                  {item.product.name}
                </h3>
                <p className="text-sm text-[#6E6E73] font-light mb-4">
                  {Number(item.unitPriceSnapshot).toFixed(2)} € / unité
                </p>

                <div className="flex items-center gap-4">
                  {/* Quantité */}
                  <div className="flex items-center gap-3 bg-[#F5F5F7] rounded-full px-4 py-2">
                    <button
                      onClick={() => updateItem(item.productId, item.quantity - 1)}
                      className="text-[#1D1D1F] w-4 text-center"
                    >
                      −
                    </button>
                    <span className="text-sm font-light w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateItem(item.productId, item.quantity + 1)}
                      className="text-[#1D1D1F] w-4 text-center"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-xs text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              {/* Prix total item */}
              <div className="text-right">
                <p className="text-lg font-light text-[#1D1D1F]">
                  {(Number(item.unitPriceSnapshot) * item.quantity).toFixed(2)} €
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé */}
        <div className="lg:col-span-1">
          <div className="bg-[#F5F5F7] rounded-2xl p-8 sticky top-24">
            <h2 className="text-xl font-light text-[#1D1D1F] mb-6">Résumé</h2>

            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between text-sm font-light text-[#6E6E73]">
                <span>Sous-total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm font-light text-[#6E6E73]">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-light text-[#1D1D1F]">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-[#0071E3] text-white text-sm py-4 rounded-full text-center hover:bg-[#0077ED] transition-colors"
            >
              Passer la commande
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}