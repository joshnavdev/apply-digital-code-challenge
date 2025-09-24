import { ProductEntity } from '../entities/product.entity';
import { OriginalProductDto } from '../dtos/originalProduct.dto';

export interface ProductService {
  getProductBySku(sku: string): Promise<ProductEntity | null>;
  updateProduct(product: ProductEntity): Promise<ProductEntity>;
  createProduct(product: OriginalProductDto): Promise<ProductEntity>;
}
