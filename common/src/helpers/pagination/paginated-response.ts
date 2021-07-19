export interface PaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
