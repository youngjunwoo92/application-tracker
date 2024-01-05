import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { Buffer } from 'buffer';

import axiosClient from '@/service/axiosClient';

import {
  CredentialFormData,
  RefreshResponse,
  LoginResponse,
} from '@/types/authTypes';

export async function loginWithEmail({
  email,
  password,
}: CredentialFormData): Promise<LoginResponse> {
  const encodedValue = Buffer.from(`${email}:${password}`, 'utf-8').toString(
    'base64',
  );

  const res = await axiosClient.post<LoginResponse>('auth/login/email', null, {
    headers: {
      Authorization: `Basic ${encodedValue}`,
    },
  });

  return res.data;
}

export async function registerWithEmail(data: CredentialFormData) {
  const res = await axiosClient.post<LoginResponse>(
    'auth/register/email',
    data,
  );
  return res.data;
}

export async function refreshAccessToken(
  refreshToken: string | undefined,
): Promise<RefreshResponse> {
  const res: AxiosResponse<RefreshResponse> =
    await axiosClient.post<RefreshResponse>('auth/token/access', null, {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
  return res.data;
}

export function useLoginWithEmail() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginWithEmail,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      navigate('/dashboard');
    },
  });
}

export function useRegsiterWithEmail() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerWithEmail,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      navigate('/dashboard');
    },
  });
}
