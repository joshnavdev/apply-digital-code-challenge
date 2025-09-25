import { ProductServiceImpl } from './product.service-impl';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';
import { Test } from '@nestjs/testing';
import { ProductService } from '../../domain/services/product.service';
import { PRODUCT_REPOSITORY } from '../../domain/constants';
import { OriginalProduct } from '../../domain/dtos/originalProduct';
import { ProductQuery } from '../../domain/dtos/productQuery';

describe('ProductServiceImpl', () => {
  let service: ProductService;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(async () => {
    const mockRepo: ProductRepository = {
      findOneBySku: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      list: jest.fn(),
    };
    const module = await Test.createTestingModule({
      providers: [ProductServiceImpl, { provide: PRODUCT_REPOSITORY, useValue: mockRepo }],
    }).compile();

    service = module.get(ProductServiceImpl);
    productRepository = module.get(PRODUCT_REPOSITORY);
  });

  describe('getProductBySku', () => {
    it('should get product by SKU', async () => {
      // Given
      const product = { id: 1, sku: 'sku1' } as unknown as ProductEntity;

      // When
      productRepository.findOneBySku.mockResolvedValue(product);
      const result = await service.getProductBySku('sku1');

      // Then
      expect(result).toBe(product);
      expect(productRepository.findOneBySku).toHaveBeenCalledWith('sku1');
    });
  });

  describe('createProduct', () => {
    it('should create product if SKU does not exist', async () => {
      // Given
      const originalProduct = { sku: 'sku1' } as unknown as OriginalProduct;
      const savedProduct = { id: 1, sku: 'sku1' } as unknown as ProductEntity;

      // When
      productRepository.findOneBySku.mockResolvedValue(null);
      productRepository.save.mockResolvedValue(savedProduct);
      const result = await service.createProduct(originalProduct);

      // Then
      expect(result).toBe(savedProduct);
      expect(productRepository.findOneBySku).toHaveBeenCalledWith('sku1');
      expect(productRepository.save).toHaveBeenCalledWith(originalProduct);
    });

    it('should throw error if product with SKU exists', async () => {
      // Given
      const originalProduct = { sku: 'sku1' } as unknown as OriginalProduct;
      const existingProduct = { id: 1, sku: 'sku1' } as unknown as ProductEntity;

      // When
      productRepository.findOneBySku.mockResolvedValue(existingProduct);

      // Then
      await expect(service.createProduct(originalProduct)).rejects.toThrow('Product with SKU sku1 already exists');
    });
  });

  describe('updateProduct', () => {
    it('should update product', async () => {
      // Given
      const product = { id: 1, sku: 'sku1' } as unknown as ProductEntity;

      // When
      productRepository.update.mockResolvedValue(product);
      const result = await service.updateProduct(product);

      // Then
      expect(result).toBe(product);
      expect(productRepository.update).toHaveBeenCalledWith(product.id, product);
    });
  });

  describe('listProducts', () => {
    it('should list products with pagination', async () => {
      // Given
      const filter: ProductQuery = { sku: 'sku1', page: 1, pageSize: 5 };
      const data = [{ id: 1, sku: 'sku1' }] as unknown as ProductEntity[];

      // When
      productRepository.list.mockResolvedValue({ data, total: 15 });
      const result = await service.listProducts(filter);

      // Then
      expect(result.data).toBe(data);
      expect(result.meta).toEqual({
        page: 1,
        pageSize: 5,
        totalPages: 3,
        total: 15,
      });
      expect(productRepository.list).toHaveBeenCalledWith(filter);
    });
  });
});
