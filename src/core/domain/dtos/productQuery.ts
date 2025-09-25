import { PaginationQuery } from './paginationQuery';

export interface ProductQuery extends PaginationQuery {
  sku?: string;
  name?: string;
  brand?: string;
  model?: string;
  category?: string;
  color?: string;
  currency?: string;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
}
