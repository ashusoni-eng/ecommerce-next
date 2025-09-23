export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  categoryImage: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  productCount: number;
};
