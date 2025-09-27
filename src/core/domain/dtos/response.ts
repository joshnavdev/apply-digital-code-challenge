export interface MetaPagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SingleResponse<T> {
  data: T;
}

export interface MultipleResponse<T> {
  data: T[];
}

export interface PaginationResponse<T> {
  meta: MetaPagination;
  data: T[];
}
