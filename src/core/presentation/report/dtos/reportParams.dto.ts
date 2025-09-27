import { IsEnum } from 'class-validator';
import { ReportTypeEnum } from '../../../domain/enums/reportType.enum';

export class ReportParamsDto {
  @IsEnum(ReportTypeEnum)
  reportType: ReportTypeEnum;
}
