import { Product } from '@/types';
import AddToCartButton from '@/components/ui/AddToCartButton';

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/catalog/products/${slug}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="text-center py-32">
        <p className="text-[#6E6E73] font-light text-xl">Produit introuvable.</p>
      </div>
    );
  }

  return (
    <div className="bg-white max-w-[980px] mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Image */}
        <div className="bg-[#F5F5F7] rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
          {product.images.length > 0 ? (
            <img
              src={product.images[0].url}
              alt={product.images[0].alt ?? product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[#6E6E73] text-sm font-light">Aucune image</span>
          )}
        </div>

        {/* Infos */}
        <div className="flex flex-col gap-6 pt-4">
          <div>
            <p className="text-sm text-[#6E6E73] font-light mb-2">
              {product.category.name}
            </p>
            <h1 className="text-4xl font-thin text-[#1D1D1F] tracking-tight mb-3">
              {product.name}
            </h1>
            <p className="text-3xl font-light text-[#1D1D1F]">
              {Number(product.price).toFixed(2)} €
            </p>
          </div>

          <div className="border-t border-gray-200" />

          <p className="text-[#6E6E73] font-light leading-relaxed">
            {product.description}
          </p>

          <div className="border-t border-gray-200" />

          <div className="flex flex-col gap-3">
            <p className="text-sm text-[#6E6E73] font-light">
              {product.stock > 0
                ? `En stock — ${product.stock} disponible${product.stock > 1 ? 's' : ''}`
                : 'Rupture de stock'}
            </p>
            <AddToCartButton product={product} />
          </div>

          <p className="text-xs text-[#6E6E73] font-light">
            Réf. {product.sku}
          </p>
        </div>
      </div>
    </div>
  );
}