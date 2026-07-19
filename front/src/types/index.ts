export interface User {
  sub: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  children: Category[];
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  position: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: string;
  stock: number;
  isActive: boolean;
  categoryId: string;
  category: Category;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  product: Product;
  quantity: number;
  unitPriceSnapshot: string;
}

export interface Cart {
  id: string;
  userId: string | null;
  sessionId: string | null;
  items: CartItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: string;
}

export interface Order {
  id: string;
  userId: string;
  status: 'PENDING' | 'PAID' | 'FULFILLED' | 'CANCELLED';
  subtotal: string;
  shippingCost: string;
  tax: string;
  total: string;
  shippingName: string;
  shippingLine1: string;
  shippingLine2: string | null;
  shippingCity: string;
  shippingZip: string;
  shippingCountry: string;
  items: OrderItem[];
  createdAt: string;
}