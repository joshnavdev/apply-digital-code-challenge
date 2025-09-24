import { ProductRepository } from '../../../../domain/repositories/producto.repository';
import { ProductEntity } from '../../../../domain/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrmEntity } from '../entities/product.orm-entity';
import { OriginalProductDto } from '../../../../domain/dtos/originalProduct.dto';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(@InjectRepository(ProductOrmEntity) private repo: Repository<ProductOrmEntity>) {}

  findOneBySku(sku: string): Promise<ProductEntity | null> {
    return this.repo.findOneBy({ sku });
  }

  save(product: OriginalProductDto): Promise<ProductEntity> {
    const productEntity = this.repo.create(product);
    return this.repo.save(productEntity);
  }

  async update(id: string, product: ProductEntity): Promise<ProductEntity> {
    const preloadedProduct = await this.repo.preload({ ...product, id });

    if (!preloadedProduct) throw new Error(`Product with ID ${product.id} not found`);

    return this.repo.save(preloadedProduct);
  }
}
