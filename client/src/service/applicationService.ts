import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import axiosClient from './axiosClient';

import {
  ApplicationsResponse,
  CreateApplicationDto,
  UpdateApplicationDto,
  ApplicationModel,
} from '@/types/applicationType';

export async function getApplications() {
  const res = await axiosClient.get<ApplicationsResponse>('/applications');
  return res.data;
}

export async function getApplication(id: number) {
  const res = await axiosClient.get<ApplicationModel>(`/applications/${id}`);
  return res.data;
}

export async function createApplication(data: CreateApplicationDto) {
  const res = await axiosClient.post<ApplicationModel>('/applications', data);
  return res.data;
}

export async function updateApplication(data: UpdateApplicationDto) {
  const { id, ...others } = data;
  const res = await axiosClient.patch<Partial<ApplicationModel>>(
    `/applications/${id}`,
    others,
  );

  return res.data;
}

export async function deleteApplication(id: number) {
  const res = await axiosClient.delete<number>(`/applications/${id}`);
  return res.data;
}

export function useGetApplications() {
  return useQuery<ApplicationsResponse, AxiosError>({
    queryKey: ['applications'],
    queryFn: getApplications,
  });
}

export function useGetApplication(id: number) {
  return useQuery<ApplicationModel, AxiosError>({
    queryKey: ['applications', id],
    queryFn: () => getApplication(id),
  });
}

export function useCreateApplication() {
  return useMutation({
    mutationFn: createApplication,
  });
}

export function useUpdateApplication() {
  return useMutation({
    mutationFn: updateApplication,
  });
}

export function useDeleteApplication() {
  return useMutation({ mutationFn: deleteApplication });
}
