import ApiResponseStatus from './ApiResponseStatus';

export type ApiResponse<T = void> = T extends void
  ? { status: ApiResponseStatus }
  : {
      status: ApiResponseStatus;
      data: T;
    };

export default ApiResponse;
