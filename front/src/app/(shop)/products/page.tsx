import Link from 'next/link';
import { Product } from '@/types';

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/catalog/products`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-white">
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-thin text-[#1D1D1F] tracking-tight mb-4">
          Catalogue
        </h1>
        <p className="text-lg text-[#6E6E73] font-light">
          {products.length} produit{products.length > 1 ? 's' : ''}
        </p>
      </section>

      <div className="border-t border-gray-200 mx-auto max-w-[980px]" />

      <section className="py-16 px-4 max-w-[980px] mx-auto">
        {products.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-[#6E6E73] font-light text-xl">
              Aucun produit disponible pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group"
              >
                {/* Image */}
                <div className="bg-[#F5F5F7] rounded-2xl aspect-square mb-4 overflow-hidden flex items-center justify-center">
                  {product.images.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      alt={product.images[0].alt ?? product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-[#6E6E73] text-sm font-light">
                      Aucune image
                    </span>
                  )}
                </div>

                {/* Infos */}
                <div className="px-1">
                  <p className="text-xs text-[#6E6E73] font-light mb-1">
                    {product.category.name}
                  </p>
                  <h3 className="text-lg font-light text-[#1D1D1F] mb-1 group-hover:text-[#0071E3] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[#1D1D1F] font-light">
                    À partir de{' '}
                    <span className="font-normal">
                      {Number(product.price).toFixed(2)} €
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}