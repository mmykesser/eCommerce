import $api from '../../api/axios';
import type { ILoginCredentials } from './auth.validation.ts';
import type { IAuthResponse, IApiResponse } from '../../types';

export const authApi = {
  async login(credentials: ILoginCredentials): Promise<IAuthResponse> {
    const response = await $api.post<IApiResponse<IAuthResponse>>('/auth/login', credentials);
    return response.data.data;
  },
};
