interface Pagination {
  current_page: number;
  total_pages: number;
  total_count: number;
}

export interface ApiResponse<T = any> {
  statusCode?: number;
  pagination?: Pagination;
  data?: T;
  error?: string;
}
