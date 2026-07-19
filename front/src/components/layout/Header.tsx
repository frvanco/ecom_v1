'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

export default function Header() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            ecom_v1
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/products" className="text-sm text-gray-600 hover:text-gray-900">
              Catalogue
            </Link>

            <Link href="/cart" className="text-sm text-gray-600 hover:text-gray-900 relative">
              Panier
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/orders" className="text-sm text-gray-600 hover:text-gray-900">
                  Mes commandes
                </Link>
                {user.role === 'ADMIN' && (
                  <Link href="/admin" className="text-sm text-blue-600 hover:text-blue-800">
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                  Inscription
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}