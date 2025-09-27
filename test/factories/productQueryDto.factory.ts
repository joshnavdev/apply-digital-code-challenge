import { ProductQuery } from '../../src/core/domain/dtos/productQuery';
import { ProductQueryDto } from '../../src/core/presentation/product/dtos/productQuery.dto';

export function createMockProductQueryDto(overrides: ProductQuery = { page: 1, pageSize: 5 }) {
  const productQuery = new ProductQueryDto();
  Object.assign(productQuery, overrides);

  return productQuery;
}
