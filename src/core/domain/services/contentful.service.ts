import { OriginalProduct } from '../dtos/originalProduct';

export interface ContentfulService {
  getOriginalProducts(): Promise<OriginalProduct[]>;
}
