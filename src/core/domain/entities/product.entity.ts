export interface ProductEntity {
  id: string;
  sku: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  color: string;
  currency: string;
  price: number;
  stock: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
