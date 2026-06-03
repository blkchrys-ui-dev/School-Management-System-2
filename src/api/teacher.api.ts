import axiosInstance from './axiosInstance';
import type { Teacher } from '../types/teacher.types';
const ENDPOINT = '/teachers';

export const getAll = async (): Promise<Teacher[]> => {
  const { data } = await axiosInstance.get<Teacher[]>(ENDPOINT);
  return data;
};

export const getById = async (id: string | number): Promise<Teacher> => {
  const { data } = await axiosInstance.get<Teacher>(`${ENDPOINT}/${id}`);
  return data;
};

export const create = async (payload: Partial<Teacher>): Promise<Teacher> => {
  const { data } = await axiosInstance.post<Teacher>(ENDPOINT, payload);
  return data;
};

export const update = async (id: string | number, payload: Partial<Teacher>): Promise<Teacher> => {
  const { data } = await axiosInstance.put<Teacher>(`${ENDPOINT}/${id}`, payload);
  return data;
};

export const remove = async (id: string | number): Promise<void> => {
  await axiosInstance.delete(`${ENDPOINT}/${id}`);
};

export default { getAll, getById, create, update, remove };
