import { Module } from '@nestjs/common';
import { ReportController } from './controllers/report.controller';
import { REPORT_SERVICE, REPORT_STRATEGY } from '../../domain/constants';
import { ReportServiceImpl } from '../../application/services/report.service-impl';
import { ReportStrategy } from '../../domain/strategies/report.strategy';
import { ReportTypeEnum } from '../../domain/enums/reportType.enum';
import { DeletedPercentageReportStrategy } from '../../application/strategies/deletedPercentageReport.strategy';
import { ProductModule } from '../product/product.module';
import { NonDeletedPercentageReportStrategy } from '../../application/strategies/nonDeletedPercentageReport.strategy';
import { CustomCategoriesPercentageReportStrategy } from '../../application/strategies/customCategoriesPercentageReport.strategy';

const strategies = [
  DeletedPercentageReportStrategy,
  NonDeletedPercentageReportStrategy,
  CustomCategoriesPercentageReportStrategy,
];

const reportStrategyProvider = {
  provide: REPORT_STRATEGY,
  useFactory: (...list: ReportStrategy<any>[]) => {
    const map = new Map<ReportTypeEnum, ReportStrategy<any>>();
    list.forEach((s) => map.set(s.type, s));
    return map;
  },
  inject: strategies,
};

@Module({
  imports: [ProductModule],
  controllers: [ReportController],
  providers: [...strategies, reportStrategyProvider, { provide: REPORT_SERVICE, useClass: ReportServiceImpl }],
})
export class ReportModule {}
