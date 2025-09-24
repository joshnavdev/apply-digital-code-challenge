export interface OriginalProductDto {
  sku: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  color: string;
  price: number;
  currency: string;
  stock: number;
}

export interface ContentfulResult {
  total: number;
  skip: number;
  limit: number;
  items: { fields: OriginalProductDto }[];
}
