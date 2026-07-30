'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(email, password);
      router.push('/');
    } catch {
      setError('Cet email est déjà utilisé.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-thin text-[#1D1D1F] text-center mb-2">
          Créer un compte
        </h1>
        <p className="text-center text-[#6E6E73] font-light text-sm mb-10">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-[#0071E3] hover:underline">
            Se connecter
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-[#F5F5F7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] font-light outline-none focus:ring-2 focus:ring-[#0071E3]"
          />

          <input
            type="password"
            placeholder="Mot de passe (6 caractères minimum)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full bg-[#F5F5F7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] font-light outline-none focus:ring-2 focus:ring-[#0071E3]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0071E3] text-white text-sm py-3 rounded-full hover:bg-[#0077ED] transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Création...' : 'Créer mon compte'}
          </button>
        </form>
      </div>
    </div>
  );
}