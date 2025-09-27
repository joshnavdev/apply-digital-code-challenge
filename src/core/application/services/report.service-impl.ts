import { ReportService } from '../../domain/services/report.service';
import { ReportTypeEnum } from '../../domain/enums/reportType.enum';
import { ReportStrategy } from '../../domain/strategies/report.strategy';
import { Inject, NotFoundException } from '@nestjs/common';
import { ReportDataByType, ReportResponseDto } from '../../domain/dtos/reportResponse.dto';
import { REPORT_STRATEGY } from '../../domain/constants';
import { ReportQuery } from '../../domain/dtos/reportQuery';

export class ReportServiceImpl implements ReportService {
  constructor(@Inject(REPORT_STRATEGY) private readonly registry: Map<ReportTypeEnum, ReportStrategy<any>>) {}

  async getReport<T extends ReportTypeEnum>(reportType: T, params: ReportQuery): Promise<ReportResponseDto<T>> {
    const strategy = this.registry.get(reportType);

    if (!strategy) throw new NotFoundException(`Unknown report type: ${reportType}`);

    const data = (await strategy.getReport(params)) as ReportDataByType[T];

    return {
      type: reportType,
      data,
    } as ReportResponseDto<T>;
  }
}
