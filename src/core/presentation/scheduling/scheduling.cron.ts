import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ContentfulService } from '../../domain/services/contentful.service';
import { ProductService } from '../../domain/services/product.service';
import { CONTENTFUL_SERVICE, PRODUCT_SERVICE } from '../../domain/constants';

@Injectable()
export class SchedulingCron implements OnModuleInit {
  private readonly logger = new Logger(SchedulingCron.name);

  constructor(
    @Inject(CONTENTFUL_SERVICE)
    private readonly contentfulService: ContentfulService,
    @Inject(PRODUCT_SERVICE)
    private readonly productService: ProductService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    try {
      this.logger.log('Cron job started');
      const originalProducts = await this.contentfulService.getOriginalProducts();

      for (const originalProduct of originalProducts) {
        try {
          const productFound = await this.productService.getProductBySku(originalProduct.sku, true);

          if (productFound) {
            if (productFound.deletedAt) continue;

            const product = {
              ...productFound,
              ...originalProduct,
            };

            await this.productService.updateProduct(product);
          } else {
            await this.productService.createProduct(originalProduct);
          }
        } catch (err) {
          this.logger.error(
            `Error processing product with SKU ${originalProduct.sku}`,
            err instanceof Error ? err.stack : 'No stack trace',
          );
        }
      }
      this.logger.log('Cron job finished');
    } catch (err) {
      this.logger.error('Error in handleCron', err instanceof Error ? err.stack : 'No stack trace');
    }
  }

  async onModuleInit() {
    this.logger.log('Run cron on init');
    await this.handleCron();
  }
}
