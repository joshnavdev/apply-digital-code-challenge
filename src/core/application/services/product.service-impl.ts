import { ProductService } from '../../domain/services/product.service';
import { ProductEntity } from '../../domain/entities/product.entity';
import { OriginalProduct } from '../../domain/dtos/originalProduct';
import { PRODUCT_REPOSITORY } from '../../domain/constants';
import { ProductRepository } from '../../domain/repositories/producto.repository';
import { Inject } from '@nestjs/common';
import { PaginationResponse } from '../../domain/dtos/response';
import { ProductQuery } from '../../domain/dtos/productQuery';

export class ProductServiceImpl implements ProductService {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepository) {}

  getProductBySku(sku: string): Promise<ProductEntity | null> {
    return this.productRepository.findOneBySku(sku);
  }

  async createProduct(originalProduct: OriginalProduct): Promise<ProductEntity> {
    const productFound = await this.productRepository.findOneBySku(originalProduct.sku);

    if (productFound) {
      throw new Error(`Product with SKU ${originalProduct.sku} already exists`);
    }

    return this.productRepository.save(originalProduct);
  }

  updateProduct(product: ProductEntity): Promise<ProductEntity> {
    return this.productRepository.update(product.id, product);
  }

  async listProducts(filter: ProductQuery): Promise<PaginationResponse<ProductEntity>> {
    const { data, total } = await this.productRepository.list(filter);

    return {
      data,
      meta: {
        page: filter.page,
        pageSize: filter.pageSize,
        totalPages: Math.ceil(total / filter.pageSize),
        total,
      },
    };
  }
}
