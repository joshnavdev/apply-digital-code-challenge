import { ReportTypeEnum } from '../enums/reportType.enum';

export interface DeletedPercentageData {
  totalCount: number;
  deletedCount: number;
  deletedPercentage: number;
}

export interface NonDeletedPercentageData {
  totalCount: number;
  withPriceCount: number;
  withoutPriceCount: number;
  withPricePercentage: number;
  withoutPricePercentage: number;
  range?: { from: string; to: string };
  filter?: { withPrice: boolean };
}

export interface CustomCategoriesPercentageData {
  totalCount: number;
  categories: { category: string; count: number; percentage: number }[];
}

export type ReportDataByType = {
  [ReportTypeEnum.DELETED_PRODUCTS_PERCENTAGE]: DeletedPercentageData;
  [ReportTypeEnum.NON_DELETED_PRODUCTS_PERCENTAGE]: NonDeletedPercentageData;
  [ReportTypeEnum.CUSTOM_CATEGORIES_PERCENTAGE]: CustomCategoriesPercentageData;
};

export interface ReportResponseDto<T extends ReportTypeEnum> {
  type: T;
  data: ReportDataByType[T];
}
