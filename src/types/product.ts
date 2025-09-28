export type ProductImage = {
  id: string;
  productId: string;
  url?: string;
  alt?: string;
  isPrimary: boolean;
  createdAt: string; // Assuming string for simplicity, can be Date
};

export type Product = {
  // imgs: any;
  id: string;
  name: string;
  slug: string;
  description?: string;
  categoryId: string;
  brand?: string;
  price: number;
  mrp?: number;
  stock: number;
  images: ProductImage[];
  createdAt: string; // Assuming string for simplicity, can be Date
  updatedAt: string; // Assuming string for simplicity, can be Date
  reviews?: number;
};