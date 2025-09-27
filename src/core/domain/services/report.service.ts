import { ReportTypeEnum } from '../enums/reportType.enum';
import { ReportResponseDto } from '../dtos/reportResponse.dto';
import { ReportQuery } from '../dtos/reportQuery';

export interface ReportService {
  getReport<T extends ReportTypeEnum>(reportType: T, params: ReportQuery): Promise<ReportResponseDto<T>>;
}
