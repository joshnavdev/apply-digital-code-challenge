import { ProductEntity } from '../../src/core/domain/entities/product.entity';
import { ProductOrmEntity } from '../../src/core/infrastructure/persistence/typeorm/entities/product.orm-entity';

export function createMockProductEntity(id: string, overrides: Partial<ProductEntity> = {}) {
  const product = new ProductOrmEntity();
  product.id = id;
  product.sku = `sku${id}`;
  Object.assign(product, overrides);

  return product;
}
