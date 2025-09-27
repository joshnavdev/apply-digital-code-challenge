import { Controller, Delete, Get, Inject, Param, Query, ParseUUIDPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../../../domain/constants';
import { ProductService } from '../../../domain/services/product.service';
import { ProductQueryDto } from '../dtos/productQuery.dto';
import { Public } from '../../auth/decorators/isPublic.decorator';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('api/products')
@Public()
export class ProductController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productService: ProductService) {}

  @Get('')
  @ApiOperation({ summary: 'List of products', description: 'Return a list of products' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  getProducts(@Query() query: ProductQueryDto) {
    return this.productService.listProducts(query);
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({
    name: 'productId',
    description: 'Product UUID',
    format: 'uuid',
    example: '7b06b0e8-0f1a-4b9f-8a6e-5b1d4e7f3c12',
  })
  @ApiNoContentResponse({ description: 'Product deleted.' })
  @ApiNotFoundResponse({ description: 'Product not found.' })
  @ApiBadRequestResponse({ description: 'Invalid UUID format.' })
  deleteProduct(@Param('productId', new ParseUUIDPipe()) productId: string) {
    return this.productService.deleteProduct(productId);
  }
}
