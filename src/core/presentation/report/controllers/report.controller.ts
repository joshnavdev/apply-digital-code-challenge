import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ReportParamsDto } from '../dtos/reportParams.dto';
import { ReportService } from '../../../domain/services/report.service';
import { REPORT_SERVICE } from '../../../domain/constants';
import { ReportQueryDto } from '../dtos/reportQuery.dto';

@Controller('api/reports')
export class ReportController {
  constructor(@Inject(REPORT_SERVICE) private readonly reportService: ReportService) {}

  @Get(':reportType')
  getReport(@Param() { reportType }: ReportParamsDto, @Query() query: ReportQueryDto) {
    return this.reportService.getReport(reportType, query);
  }
}
