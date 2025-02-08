export interface ApiError {
  status_code: number;
  status_message: string;
  success: boolean;
}

export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface ApiRequestParams {
  api_key: string;
  language?: string;
  page?: number;
  region?: string;
}

export interface SearchParams extends ApiRequestParams {
  query: string;
  include_adult?: boolean;
} 