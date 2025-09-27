/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ProductRepositoryImpl } from './product.repository-impl';
import { ProductOrmEntity } from '../entities/product.orm-entity';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OriginalProduct } from '../../../../domain/dtos/originalProduct';

describe('ProductRepositoryImpl', () => {
  let repo: jest.Mocked<Repository<ProductOrmEntity>>;
  let productRepository: ProductRepositoryImpl;

  beforeEach(async () => {
    const mockRepo = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      preload: jest.fn(),
      createQueryBuilder: jest.fn(),
      findOneBy: jest.fn(),
      softDelete: jest.fn(),
      count: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepositoryImpl,
        {
          provide: getRepositoryToken(ProductOrmEntity),
          useValue: mockRepo,
        },
      ],
    }).compile();

    repo = module.get(getRepositoryToken(ProductOrmEntity));
    productRepository = module.get(ProductRepositoryImpl);
  });

  describe('findOneBySku', () => {
    it('should find one by sku', async () => {
      // Given
      const product = { id: '1', sku: 'sku1' } as ProductOrmEntity;

      // When
      repo.findOne.mockResolvedValue(product);
      const result = await productRepository.findOneBySku('sku1');

      // Then
      expect(result).toEqual({ id: '1', sku: 'sku1' });
      expect(repo.findOne).toHaveBeenCalledWith({ where: { sku: 'sku1' }, withDeleted: false });
    });
  });

  describe('save', () => {
    it('should save a product', async () => {
      // Given
      const product = { sku: 'sku1', name: 'Test' } as ProductOrmEntity;

      // When
      repo.create.mockReturnValue(product);
      repo.save.mockResolvedValue(product);
      const result = await productRepository.save(product as OriginalProduct);

      // Then
      expect(result).toEqual(product);
      expect(repo.create).toHaveBeenCalledWith(product);
      expect(repo.save).toHaveBeenCalledWith(product);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      // Given
      const product = { id: '1', name: 'Test' } as ProductOrmEntity;

      // When
      repo.preload.mockResolvedValue(product);
      repo.save.mockResolvedValue(product);

      // Then
      const result = await productRepository.update('1', product);
      expect(result).toEqual(product);
      expect(repo.preload).toHaveBeenCalledWith({ ...product, id: '1' });
      expect(repo.save).toHaveBeenCalledWith(product);
    });

    it('should throw error if product not found on update', async () => {
      // Given
      const product = { id: '1' } as ProductOrmEntity;

      // When
      repo.preload.mockResolvedValue(undefined);

      // Then
      await expect(productRepository.update('1', product)).rejects.toThrow('Product with ID 1 not found');
    });
  });

  describe('findOneById', () => {
    it('should find one by id', async () => {
      // Given
      const product = { id: '1' } as ProductOrmEntity;

      // When
      repo.findOneBy.mockResolvedValue(product);
      const result = await productRepository.findOneById('1');

      // Then
      expect(result).toEqual({ id: '1' });
      expect(repo.findOneBy).toHaveBeenCalledWith({ id: '1' });
    });
  });

  describe('softDelete', () => {
    it('should soft delete a product', async () => {
      repo.softDelete.mockResolvedValue({} as any);
      await productRepository.softDelete({ id: '1' } as any);
      expect(repo.softDelete).toHaveBeenCalledWith('1');
    });
  });

  describe('count', () => {
    it('should count products', async () => {
      // When
      repo.count.mockResolvedValue(5);
      const result = await productRepository.count();

      // Then
      expect(result).toBe(5);
      expect(repo.count).toHaveBeenCalledWith({ withDeleted: false });
    });
  });

  describe('countDeleted', () => {
    it('should count deleted products', async () => {
      // When
      repo.count.mockResolvedValue(2);
      const result = await productRepository.countDeleted();

      // Then
      expect(result).toBe(2);
      expect(repo.count).toHaveBeenCalledWith({ where: { deletedAt: expect.anything() }, withDeleted: true });
    });
  });

  describe('countByRangeDateAndWithPrice', () => {
    it('should count by range date and with price', async () => {
      // When
      repo.count.mockResolvedValue(3);
      const result = await productRepository.countByRangeDateAndWithPrice('2023-01-01', '2023-01-31', true);

      // Then
      expect(result).toBe(3);
      expect(repo.count).toHaveBeenCalledWith({ where: expect.any(Object) });
    });
  });

  describe('groupByCategoryCount', () => {
    it('should group by category count', async () => {
      // Given
      const qb: any = {
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([{ category: 'A', count: 2 }]),
      };

      // When
      repo.createQueryBuilder.mockReturnValue(qb);
      const result = await productRepository.groupByCategoryCount();

      // Then
      expect(result).toEqual([{ category: 'A', count: 2 }]);
      expect(qb.getRawMany).toHaveBeenCalled();
    });
  });
});
