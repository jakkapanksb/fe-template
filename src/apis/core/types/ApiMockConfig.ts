import { AxiosRequestConfig } from 'axios';
import ApiResponse from './ApiResponse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiMockConfig<T = any> {
  method: 'delete' | 'get' | 'patch' | 'post' | 'put';
  endpoint: string | RegExp;
  data: ApiResponse<T> | ((config: AxiosRequestConfig) => ApiResponse<T> | Promise<ApiResponse<T>>);
}

export default ApiMockConfig;
