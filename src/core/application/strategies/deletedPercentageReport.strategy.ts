import { ReportStrategy } from '../../domain/strategies/report.strategy';
import { ReportTypeEnum } from '../../domain/enums/reportType.enum';
import { ReportDataByType } from '../../domain/dtos/reportResponse.dto';
import { Inject } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../../domain/constants';
import { ProductService } from '../../domain/services/product.service';

export class DeletedPercentageReportStrategy implements ReportStrategy<ReportTypeEnum.DELETED_PRODUCTS_PERCENTAGE> {
  readonly type = ReportTypeEnum.DELETED_PRODUCTS_PERCENTAGE as const;

  constructor(@Inject(PRODUCT_SERVICE) private readonly productService: ProductService) {}

  async getReport(): Promise<ReportDataByType[ReportTypeEnum.DELETED_PRODUCTS_PERCENTAGE]> {
    const [totalCount, deletedCount] = await Promise.all([
      this.productService.countProducts(true),
      this.productService.countDeletedProducts(),
    ]);

    const deletedPercentage = totalCount === 0 ? 0 : (deletedCount / totalCount) * 100;

    return {
      totalCount,
      deletedCount,
      deletedPercentage: +deletedPercentage.toFixed(2),
    };
  }
}
