import { ReportTypeEnum } from '../enums/reportType.enum';
import { ReportDataByType } from '../dtos/reportResponse.dto';

export interface ReportStrategy<T extends ReportTypeEnum> {
  readonly type: T;
  getReport(params: Record<string, any>): Promise<ReportDataByType[T]>;
}
