import axiosInstance from './axiosInstance';
import type { HomeworkItem } from '../types/student.types';
const ENDPOINT = '/homework';

export const getAll = async (): Promise<HomeworkItem[]> => {
  const { data } = await axiosInstance.get<HomeworkItem[]>(ENDPOINT);
  return data;
};

export const getById = async (id: string | number): Promise<HomeworkItem> => {
  const { data } = await axiosInstance.get<HomeworkItem>(`${ENDPOINT}/${id}`);
  return data;
};

export const create = async (payload: Partial<HomeworkItem>): Promise<HomeworkItem> => {
  const { data } = await axiosInstance.post<HomeworkItem>(ENDPOINT, payload);
  return data;
};

export const update = async (id: string | number, payload: Partial<HomeworkItem>): Promise<HomeworkItem> => {
  const { data } = await axiosInstance.put<HomeworkItem>(`${ENDPOINT}/${id}`, payload);
  return data;
};

export const remove = async (id: string | number): Promise<void> => {
  await axiosInstance.delete(`${ENDPOINT}/${id}`);
};

export default { getAll, getById, create, update, remove };
