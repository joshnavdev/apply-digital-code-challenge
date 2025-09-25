import { Controller, Get, Inject, Query } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../../../domain/constants';
import { ProductService } from '../../../domain/services/product.service';
import { ProductQueryDto } from '../dtos/productQuery.dto';

@Controller('api/products')
export class ProductController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productService: ProductService) {}

  @Get('')
  getProducts(@Query() query: ProductQueryDto) {
    return this.productService.listProducts(query);
  }
}
