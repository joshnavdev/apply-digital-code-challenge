import { ProductEntity } from '../entities/product.entity';
import { OriginalProduct } from '../dtos/originalProduct';
import { ProductQuery } from '../dtos/productQuery';

export interface ProductRepository {
  findOneBySku(sku: string): Promise<ProductEntity | null>;
  save(product: OriginalProduct): Promise<ProductEntity>;
  update(id: string, product: ProductEntity): Promise<ProductEntity>;
  list(query: ProductQuery): Promise<{ data: ProductEntity[]; total: number }>;
  findOneById(id: string): Promise<ProductEntity | null>;
  softDelete(product: ProductEntity): Promise<void>;
}
