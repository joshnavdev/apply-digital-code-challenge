import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ReportParamsDto } from '../dtos/reportParams.dto';
import { ReportService } from '../../../domain/services/report.service';
import { REPORT_SERVICE } from '../../../domain/constants';
import { ReportQueryDto } from '../dtos/reportQuery.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ReportTypeEnum } from '../../../domain/enums/reportType.enum';

@ApiTags('reports')
@ApiBearerAuth()
@Controller('api/reports')
export class ReportController {
  constructor(@Inject(REPORT_SERVICE) private readonly reportService: ReportService) {}

  @Get(':reportType')
  @ApiOperation({
    summary: 'Get a report by type',
    description:
      'Returns a discriminated payload depending on the report type (deleted percentage, active percentage, or a custom report).',
  })
  @ApiParam({
    name: 'reportType',
    enum: ReportTypeEnum,
    description: 'Report type discriminator.',
    example: ReportTypeEnum.DELETED_PRODUCTS_PERCENTAGE,
  })
  getReport(@Param() { reportType }: ReportParamsDto, @Query() query: ReportQueryDto) {
    return this.reportService.getReport(reportType, query);
  }
}
