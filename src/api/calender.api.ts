import axiosInstance from './axiosInstance';
export type ApiEntity = Record<string, unknown>;

const ENDPOINT = '/calendar';

export const getAll = async (): Promise<ApiEntity[]> => {
  const { data } = await axiosInstance.get<ApiEntity[]>(ENDPOINT);
  return data;
};

export const getById = async (id: string | number): Promise<ApiEntity> => {
  const { data } = await axiosInstance.get<ApiEntity>(`${ENDPOINT}/${id}`);
  return data;
};

export const create = async (payload: Partial<ApiEntity>): Promise<ApiEntity> => {
  const { data } = await axiosInstance.post<ApiEntity>(ENDPOINT, payload);
  return data;
};

export const update = async (id: string | number, payload: Partial<ApiEntity>): Promise<ApiEntity> => {
  const { data } = await axiosInstance.put<ApiEntity>(`${ENDPOINT}/${id}`, payload);
  return data;
};

export const remove = async (id: string | number): Promise<void> => {
  await axiosInstance.delete(`${ENDPOINT}/${id}`);
};

export default { getAll, getById, create, update, remove };
