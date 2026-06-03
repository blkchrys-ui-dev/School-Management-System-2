import axiosInstance from './axiosInstance';
import type { Notice } from '../types/teacher.types';
const ENDPOINT = '/notices';

export const getAll = async (): Promise<Notice[]> => {
  const { data } = await axiosInstance.get<Notice[]>(ENDPOINT);
  return data;
};

export const getById = async (id: string | number): Promise<Notice> => {
  const { data } = await axiosInstance.get<Notice>(`${ENDPOINT}/${id}`);
  return data;
};

export const create = async (payload: Partial<Notice>): Promise<Notice> => {
  const { data } = await axiosInstance.post<Notice>(ENDPOINT, payload);
  return data;
};

export const update = async (id: string | number, payload: Partial<Notice>): Promise<Notice> => {
  const { data } = await axiosInstance.put<Notice>(`${ENDPOINT}/${id}`, payload);
  return data;
};

export const remove = async (id: string | number): Promise<void> => {
  await axiosInstance.delete(`${ENDPOINT}/${id}`);
};

export default { getAll, getById, create, update, remove };
