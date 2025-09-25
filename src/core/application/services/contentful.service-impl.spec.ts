import { ContentfulService } from '../../domain/services/contentful.service';
import { HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ContentfulServiceImpl } from './contentful.service-impl';
import { ContentfulResult } from '../../domain/dtos/originalProduct';
import { of, throwError } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';

describe('ContentfulServiceImpl', () => {
  let service: ContentfulService;
  let httpService: jest.Mocked<HttpService>;

  beforeEach(async () => {
    const mockHttpService: Partial<jest.Mocked<HttpService>> = { get: jest.fn() };
    const module = await Test.createTestingModule({
      providers: [ContentfulServiceImpl, { provide: HttpService, useValue: mockHttpService }],
    }).compile();

    service = module.get(ContentfulServiceImpl);
    httpService = module.get(HttpService);
  });

  describe('getOriginalProducts', () => {
    it('should return mapped original products on success', async () => {
      // Given
      const mockResponse: AxiosResponse<ContentfulResult> = {
        data: {
          items: [
            { fields: { sku: 'sku1', name: 'Product 1' } },
            { fields: { sku: 'sku2', name: 'Product 2' } },
            { fields: { sku: 'sku3', name: 'Product 3' } },
          ],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
      } as unknown as AxiosResponse<ContentfulResult>;

      // When
      httpService.get.mockReturnValueOnce(of(mockResponse));
      const result = await service.getOriginalProducts();

      // Then
      expect(result).toEqual([
        { sku: 'sku1', name: 'Product 1' },
        { sku: 'sku2', name: 'Product 2' },
        { sku: 'sku3', name: 'Product 3' },
      ]);
      expect(httpService.get).toHaveBeenCalledWith('', { headers: { 'Content-Type': 'application/json' } });
    });
  });

  it('should throw error if httpService.get fails', async () => {
    // Given
    const error = new AxiosError('Network error');

    // When
    httpService.get.mockReturnValue(throwError(() => error));
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Then
    await expect(service.getOriginalProducts()).rejects.toThrow('Failed to fetch original products from Contentful');
    expect(console.error).toHaveBeenCalledWith(error);
  });
});
