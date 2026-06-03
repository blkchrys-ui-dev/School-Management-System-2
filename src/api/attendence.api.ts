import axiosInstance from './axiosInstance';
import type { AttendanceRecord } from '../types/student.types';
const ENDPOINT = '/attendance';

export const getAll = async (): Promise<AttendanceRecord[]> => {
  const { data } = await axiosInstance.get<AttendanceRecord[]>(ENDPOINT);
  return data;
};

export const getById = async (id: string | number): Promise<AttendanceRecord> => {
  const { data } = await axiosInstance.get<AttendanceRecord>(`${ENDPOINT}/${id}`);
  return data;
};

export const create = async (payload: Partial<AttendanceRecord>): Promise<AttendanceRecord> => {
  const { data } = await axiosInstance.post<AttendanceRecord>(ENDPOINT, payload);
  return data;
};

export const update = async (id: string | number, payload: Partial<AttendanceRecord>): Promise<AttendanceRecord> => {
  const { data } = await axiosInstance.put<AttendanceRecord>(`${ENDPOINT}/${id}`, payload);
  return data;
};

export const remove = async (id: string | number): Promise<void> => {
  await axiosInstance.delete(`${ENDPOINT}/${id}`);
};

export default { getAll, getById, create, update, remove };
