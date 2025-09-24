import { ProductEntity } from '../entities/product.entity';
import { OriginalProductDto } from '../dtos/originalProduct.dto';

export interface ProductRepository {
  findOneBySku(sku: string): Promise<ProductEntity | null>;
  save(product: OriginalProductDto): Promise<ProductEntity>;
  update(id: string, product: ProductEntity): Promise<ProductEntity>;
}
