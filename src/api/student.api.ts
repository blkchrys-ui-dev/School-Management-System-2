import axiosInstance from './axiosInstance';
import type { Student } from '../types/student.types';
const ENDPOINT = '/students';

export const getAll = async (): Promise<Student[]> => {
  const { data } = await axiosInstance.get<Student[]>(ENDPOINT);
  return data;
};

export const getById = async (id: string | number): Promise<Student> => {
  const { data } = await axiosInstance.get<Student>(`${ENDPOINT}/${id}`);
  return data;
};

export const create = async (payload: Partial<Student>): Promise<Student> => {
  const { data } = await axiosInstance.post<Student>(ENDPOINT, payload);
  return data;
};

export const update = async (id: string | number, payload: Partial<Student>): Promise<Student> => {
  const { data } = await axiosInstance.put<Student>(`${ENDPOINT}/${id}`, payload);
  return data;
};

export const remove = async (id: string | number): Promise<void> => {
  await axiosInstance.delete(`${ENDPOINT}/${id}`);
};

export default { getAll, getById, create, update, remove };
