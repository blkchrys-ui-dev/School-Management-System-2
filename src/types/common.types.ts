export type ID = string | number;

export type Status = 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface BaseEntity {
  id: ID;
  createdAt?: string;
  updatedAt?: string;
}
