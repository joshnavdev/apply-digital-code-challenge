import { ReportStrategy } from '../../domain/strategies/report.strategy';
import { ReportTypeEnum } from '../../domain/enums/reportType.enum';
import { Inject } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../../domain/constants';
import { ProductService } from '../../domain/services/product.service';
import { ReportDataByType } from '../../domain/dtos/reportResponse.dto';

export class CustomCategoriesPercentageReportStrategy
  implements ReportStrategy<ReportTypeEnum.CUSTOM_CATEGORIES_PERCENTAGE>
{
  readonly type = ReportTypeEnum.CUSTOM_CATEGORIES_PERCENTAGE as const;

  constructor(@Inject(PRODUCT_SERVICE) private readonly productService: ProductService) {}

  async getReport(): Promise<ReportDataByType[ReportTypeEnum.CUSTOM_CATEGORIES_PERCENTAGE]> {
    const totalCount = await this.productService.countProducts(false);
    const productCategoriesCount = await this.productService.getProductsGroupByCategoryCount();

    const categories = productCategoriesCount.map((productCategory) => {
      const count = Number(productCategory.count);
      const percentage = totalCount === 0 ? 0 : (count / totalCount) * 100;

      return {
        category: productCategory.category,
        count,
        percentage: +percentage.toFixed(2),
      };
    });

    return { totalCount, categories };
  }
}
