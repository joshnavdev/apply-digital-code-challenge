import { ProductEntity } from '../entities/product.entity';
import { OriginalProduct } from '../dtos/originalProduct';
import { PaginationResponse } from '../dtos/response';
import { ProductQuery } from '../dtos/productQuery';

export interface ProductService {
  getProductBySku(sku: string): Promise<ProductEntity | null>;
  updateProduct(product: ProductEntity): Promise<ProductEntity>;
  createProduct(product: OriginalProduct): Promise<ProductEntity>;
  listProducts(filter: ProductQuery): Promise<PaginationResponse<ProductEntity>>;
}
