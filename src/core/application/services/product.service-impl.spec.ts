import { ProductServiceImpl } from './product.service-impl';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';
import { Test } from '@nestjs/testing';
import { ProductService } from '../../domain/services/product.service';
import { PRODUCT_REPOSITORY } from '../../domain/constants';
import { OriginalProduct } from '../../domain/dtos/originalProduct';
import { NotFoundException } from '@nestjs/common';
import { createMockProductQueryDto } from '../../../../test/factories/productQueryDto.factory';
import { ProductQuery } from '../../domain/dtos/productQuery';
import { createMockProductEntity } from '../../../../test/factories/productEntity.factory';

describe('ProductServiceImpl', () => {
  let service: ProductService;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(async () => {
    const mockRepo: ProductRepository = {
      findOneBySku: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      list: jest.fn(),
      findOneById: jest.fn(),
      softDelete: jest.fn(),
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
      const product = createMockProductEntity('1');

      // When
      productRepository.findOneBySku.mockResolvedValue(product);
      const result = await service.getProductBySku('sku1', false);

      // Then
      expect(result).toBe(product);
      expect(productRepository.findOneBySku).toHaveBeenCalledWith('sku1', false);
    });
  });

  describe('createProduct', () => {
    it('should create product if SKU does not exist', async () => {
      // Given
      const originalProduct = { sku: 'sku1' } as unknown as OriginalProduct;
      const savedProduct = createMockProductEntity('1');

      // When
      productRepository.findOneBySku.mockResolvedValue(null);
      productRepository.save.mockResolvedValue(savedProduct);
      const result = await service.createProduct(originalProduct);

      // Then
      expect(result).toBe(savedProduct);
      expect(productRepository.findOneBySku).toHaveBeenCalledWith('sku1', false);
      expect(productRepository.save).toHaveBeenCalledWith(originalProduct);
    });

    it('should throw error if product with SKU exists', async () => {
      // Given
      const originalProduct = { sku: 'sku1' } as unknown as OriginalProduct;
      const existingProduct = createMockProductEntity('1');

      // When
      productRepository.findOneBySku.mockResolvedValue(existingProduct);

      // Then
      await expect(service.createProduct(originalProduct)).rejects.toThrow('Product with SKU sku1 already exists');
    });
  });

  describe('updateProduct', () => {
    it('should update product', async () => {
      // Given
      const product = createMockProductEntity('1');

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
      const filter = createMockProductQueryDto({ sku: 'sku1', page: 1, pageSize: 5 } as ProductQuery);
      const data = [createMockProductEntity('1')] as unknown as ProductEntity[];

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

  describe('deleteProduct', () => {
    it('should delete a product by id', async () => {
      // Given
      const mockedProduct = createMockProductEntity('1');

      // When
      productRepository.findOneById.mockResolvedValue(mockedProduct);
      productRepository.softDelete.mockResolvedValue(undefined);
      await service.deleteProduct('1');

      // Then
      expect(productRepository.findOneById).toHaveBeenCalledWith('1');
      expect(productRepository.softDelete).toHaveBeenCalledWith(mockedProduct);
    });

    it('should throw NotFoundException if product does not exist', async () => {
      // When
      productRepository.findOneById.mockResolvedValue(null);

      // Then
      await expect(service.deleteProduct('1')).rejects.toThrow(NotFoundException);
    });
  });
});
