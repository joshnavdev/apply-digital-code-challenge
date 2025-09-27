import { ReportStrategy } from '../../domain/strategies/report.strategy';
import { ReportTypeEnum } from '../../domain/enums/reportType.enum';
import { ReportDataByType } from '../../domain/dtos/reportResponse.dto';
import { Inject } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../../domain/constants';
import { ProductService } from '../../domain/services/product.service';
import { ReportQuery } from '../../domain/dtos/reportQuery';

export class NonDeletedPercentageReportStrategy
  implements ReportStrategy<ReportTypeEnum.NON_DELETED_PRODUCTS_PERCENTAGE>
{
  readonly type = ReportTypeEnum.NON_DELETED_PRODUCTS_PERCENTAGE as const;

  constructor(@Inject(PRODUCT_SERVICE) private readonly productService: ProductService) {}

  async getReport(
    params: Record<string, any>,
  ): Promise<ReportDataByType[ReportTypeEnum.NON_DELETED_PRODUCTS_PERCENTAGE]> {
    const { from, to, withPrice } = params as ReportQuery;

    const [totalCount, withPriceCount, withoutPriceCount] = await Promise.all([
      this.productService.countProductsByRangeDateAndWithPrice(from, to, undefined),
      this.productService.countProductsByRangeDateAndWithPrice(from, to, true),
      this.productService.countProductsByRangeDateAndWithPrice(from, to, false),
    ]);

    const consideredTotal = withPrice === undefined ? totalCount : withPrice ? withPriceCount : withoutPriceCount;
    const percentageWithPrice = consideredTotal === 0 ? 0 : (withPriceCount / consideredTotal) * 100;
    const percentageWithoutPrice = consideredTotal === 0 ? 0 : (withoutPriceCount / consideredTotal) * 100;

    return {
      totalCount,
      withPriceCount,
      withoutPriceCount,
      withPricePercentage: +percentageWithPrice.toFixed(2),
      withoutPricePercentage: +percentageWithoutPrice.toFixed(2),
      range: from && to ? { from, to } : undefined,
      filter: withPrice !== undefined ? { withPrice } : undefined,
    };
  }
}
