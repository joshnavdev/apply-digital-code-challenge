import { OriginalProductDto } from '../dtos/originalProduct.dto';

export interface ContentfulService {
  getOriginalProducts(): Promise<OriginalProductDto[]>;
}
