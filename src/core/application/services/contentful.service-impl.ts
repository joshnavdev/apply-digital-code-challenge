import { ContentfulService } from '../../domain/services/contentful.service';
import { ContentfulResult, OriginalProduct } from '../../domain/dtos/originalProduct';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class ContentfulServiceImpl implements ContentfulService {
  constructor(private readonly httpService: HttpService) {}

  async getOriginalProducts(): Promise<OriginalProduct[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<ContentfulResult>('', { headers: { 'Content-Type': 'application/json' } }).pipe(
        catchError((error: AxiosError) => {
          console.error(error);
          throw new Error('Failed to fetch original products from Contentful');
        }),
      ),
    );

    return data.items.map((item) => ({ ...item.fields }));
  }
}
