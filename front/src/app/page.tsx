import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="text-center py-32 px-4">
        <h1 className="text-6xl font-thin text-[#1D1D1F] tracking-tight mb-4">
          La boutique.
        </h1>
        <p className="text-xl text-[#6E6E73] font-light mb-8 max-w-xl mx-auto">
          Des produits sélectionnés avec soin. Livrés chez vous.
        </p>
        <Link
          href="/products"
          className="inline-block bg-[#0071E3] text-white text-sm px-6 py-3 rounded-full hover:bg-[#0077ED] transition-colors"
        >
          Découvrir le catalogue
        </Link>
      </section>

      {/* Séparateur */}
      <div className="border-t border-gray-200 mx-auto max-w-[980px]" />

      {/* Section catégories */}
      <section className="py-20 px-4 max-w-[980px] mx-auto">
        <h2 className="text-3xl font-thin text-[#1D1D1F] text-center mb-16">
          Parcourir par catégorie
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {['Vêtements', 'Accessoires', 'Chaussures'].map((cat) => (
            <Link
              key={cat}
              href="/products"
              className="bg-[#F5F5F7] rounded-2xl p-12 text-center hover:bg-gray-100 transition-colors"
            >
              <span className="text-xl font-light text-[#1D1D1F]">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Séparateur */}
      <div className="border-t border-gray-200 mx-auto max-w-[980px]" />

      {/* Section produits phares */}
      <section className="py-20 px-4 max-w-[980px] mx-auto">
        <h2 className="text-3xl font-thin text-[#1D1D1F] text-center mb-4">
          Nouveautés
        </h2>
        <p className="text-center text-[#6E6E73] font-light mb-12">
          Les derniers ajouts à notre catalogue.
        </p>
        <div className="text-center">
          <Link
            href="/products"
            className="text-[#0071E3] text-sm hover:underline"
          >
            Voir tous les produits →
          </Link>
        </div>
      </section>
    </div>
  );
}