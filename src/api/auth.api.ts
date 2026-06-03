import axiosInstance from './axiosInstance';
import type { LoginRequest, LoginResponse } from '../types/auth.types';

export const loginUser = async (payload: LoginRequest): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>('/auth/login', payload);
  return data;
};

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const { data } = await axiosInstance.post<{ message: string }>('/auth/forgot-password', { email });
  return data;
};

export default { loginUser, forgotPassword };
