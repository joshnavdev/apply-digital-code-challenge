import { ProductService } from '../../domain/services/product.service';
import { ProductEntity } from '../../domain/entities/product.entity';
import { OriginalProductDto } from '../../domain/dtos/originalProduct.dto';
import { PRODUCT_REPOSITORY } from '../../domain/constants';
import { ProductRepository } from '../../domain/repositories/producto.repository';
import { Inject } from '@nestjs/common';

export class ProductServiceImpl implements ProductService {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepository) {}

  getProductBySku(sku: string): Promise<ProductEntity | null> {
    return this.productRepository.findOneBySku(sku);
  }

  async createProduct(originalProduct: OriginalProductDto): Promise<ProductEntity> {
    const productFound = await this.productRepository.findOneBySku(originalProduct.sku);

    if (productFound) {
      throw new Error(`Product with SKU ${originalProduct.sku} already exists`);
    }

    return this.productRepository.save(originalProduct);
  }

  updateProduct(product: ProductEntity): Promise<ProductEntity> {
    return this.productRepository.update(product.id, product);
  }
}
