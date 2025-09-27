import { ProductEntity } from '../entities/product.entity';
import { OriginalProduct } from '../dtos/originalProduct';
import { ProductQuery } from '../dtos/productQuery';

export interface ProductRepository {
  findOneBySku(sku: string, withDeleted: boolean): Promise<ProductEntity | null>;
  save(product: OriginalProduct): Promise<ProductEntity>;
  update(id: string, product: ProductEntity): Promise<ProductEntity>;
  list(query: ProductQuery): Promise<{ data: ProductEntity[]; total: number }>;
  findOneById(id: string): Promise<ProductEntity | null>;
  softDelete(product: ProductEntity): Promise<void>;
  count(withDeleted: boolean): Promise<number>;
  countDeleted(): Promise<number>;
  countByRangeDateAndWithPrice(from?: string, to?: string, withPrice?: boolean): Promise<number>;
  groupByCategoryCount(): Promise<{ category: string; count: number }[]>;
}
