import { ProductRepository } from '../../../../domain/repositories/producto.repository';
import { ProductEntity } from '../../../../domain/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrmEntity } from '../entities/product.orm-entity';
import { OriginalProduct } from '../../../../domain/dtos/originalProduct';
import { ProductQuery } from '../../../../domain/dtos/productQuery';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(@InjectRepository(ProductOrmEntity) private repo: Repository<ProductOrmEntity>) {}

  findOneBySku(sku: string): Promise<ProductEntity | null> {
    return this.repo.findOneBy({ sku });
  }

  save(product: OriginalProduct): Promise<ProductEntity> {
    const productEntity = this.repo.create(product);
    return this.repo.save(productEntity);
  }

  async update(id: string, product: ProductEntity): Promise<ProductEntity> {
    const preloadedProduct = await this.repo.preload({ ...product, id });

    if (!preloadedProduct) throw new Error(`Product with ID ${product.id} not found`);

    return this.repo.save(preloadedProduct);
  }

  async list(query: ProductQuery): Promise<{ data: ProductEntity[]; total: number }> {
    const q = this.repo.createQueryBuilder('p').orderBy('p.createdAt', 'DESC');

    const { minPrice, maxPrice, name, page, pageSize, minStock, ...stringQuery } = query;

    Object.keys(stringQuery).forEach((key) => {
      const val = stringQuery[key as keyof typeof stringQuery];

      if (!val) return;

      q.andWhere(`p.${key} ILIKE :${key}`, { [key]: val });
    });

    if (name) {
      q.andWhere('p.name ILIKE :name', { name: `%${name}%` });
    }

    if (minPrice) {
      q.andWhere('p.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      q.andWhere('p.price <= :maxPrice', { maxPrice });
    }

    if (minStock) {
      q.andWhere('p.stock >= :minStock', { minStock });
    }

    const [items, count] = await q
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { data: items, total: count };
  }
}
