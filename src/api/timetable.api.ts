import axiosInstance from './axiosInstance';
import type { TimetableSlot } from '../types/teacher.types';
const ENDPOINT = '/timetable';

export const getAll = async (): Promise<TimetableSlot[]> => {
  const { data } = await axiosInstance.get<TimetableSlot[]>(ENDPOINT);
  return data;
};

export const getById = async (id: string | number): Promise<TimetableSlot> => {
  const { data } = await axiosInstance.get<TimetableSlot>(`${ENDPOINT}/${id}`);
  return data;
};

export const create = async (payload: Partial<TimetableSlot>): Promise<TimetableSlot> => {
  const { data } = await axiosInstance.post<TimetableSlot>(ENDPOINT, payload);
  return data;
};

export const update = async (id: string | number, payload: Partial<TimetableSlot>): Promise<TimetableSlot> => {
  const { data } = await axiosInstance.put<TimetableSlot>(`${ENDPOINT}/${id}`, payload);
  return data;
};

export const remove = async (id: string | number): Promise<void> => {
  await axiosInstance.delete(`${ENDPOINT}/${id}`);
};

export default { getAll, getById, create, update, remove };
