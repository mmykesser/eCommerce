import $api from '../../api/axios';
import type { ILoginCredentials, IRegisterCredentials } from './auth.validation';
import type { IAuthResponse, IApiResponse } from '../../types';

export const authApi = {
  async login(credentials: ILoginCredentials): Promise<IAuthResponse> {
    const response = await $api.post<IApiResponse<IAuthResponse>>('/auth/login', credentials);
    return response.data.data;
  },

  async register(
    credentials: Omit<IRegisterCredentials, 'confirmPassword'>,
  ): Promise<IAuthResponse> {
    const response = await $api.post<IApiResponse<IAuthResponse>>('/auth/register', {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    });
    return response.data.data;
  },
};
