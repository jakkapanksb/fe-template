import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, ApiResponseCode, ApiResponseStatus } from "../types";

/**
 * Check if the error is AxiosError
 */
export function isApiError(error: unknown): error is AxiosError {
  return Boolean(
    error && typeof error === "object" && (error as AxiosError).isAxiosError
  );
}

/**
 * Check if object is AxiosResponse
 */
export function isAxiosResponse(response: unknown): response is AxiosResponse {
  return Boolean(
    response &&
      typeof response === "object" &&
      typeof (response as AxiosResponse).status === "number" &&
      typeof (response as AxiosResponse).data === "object" &&
      (response as AxiosResponse).data
  );
}

/**
 * Check if response is ApiResponse
 */
export function isApiResponse(response: unknown): response is ApiResponse {
  return Boolean(
    response &&
      typeof response === "object" &&
      typeof (response as ApiResponse).status === "object" &&
      (response as ApiResponse).status &&
      typeof (response as ApiResponse).status.code === "number" &&
      ((response as ApiResponse).status.header == null ||
        typeof (response as ApiResponse).status.header === "string") &&
      ((response as ApiResponse).status.description == null ||
        typeof (response as ApiResponse).status.description === "string")
  );
}

/**
 * Convert error object to AxiosError
 */
export function enhanceApiError<T = void>(
  error: Error,
  response: AxiosResponse<ApiResponse<T>>
): AxiosError<ApiResponse<T>> {
  const axiosError = error as AxiosError;
  axiosError.isAxiosError = true;
  axiosError.config = response.config;
  axiosError.request = response.request;
  axiosError.response = response;
  return axiosError;
}

/**
 * Put default error message if no message was given
 */
export function normalizeErrorStatus(
  errorStatus: ApiResponseStatus
): ApiResponseStatus {
  const { code = 0 } = errorStatus;
  let { header = "", description = "" } = errorStatus;

  // Only when backend don't return any message, we put default message
  if (!header && !description) {
    header = "common.error.header";
    description = "common.error.message";
  }

  return { code, header, description };
}

/**
 * Get error message in form of ApiResponseStatus from the API response
 */
export function getErrorStatus(error: unknown): ApiResponseStatus {
  let code = 0;
  let header = "";
  let description = "";
  if (isApiError(error) && error.response) {
    const { data } = error.response;
    if (isApiResponse(data)) {
      code = data.status.code;
      header = data.status.header || "";
      description = data.status.description || "";
    }
  }

  return normalizeErrorStatus({ code, header, description });
}

/**
 * Checks if an axios response is success or not.
 * This will check if the server has sent 1000 as status.code
 * @param response Response to verify the status codes against.
 * @returns true if the status.code is 1000, else false.
 */
export function isResponseSuccess(
  response: AxiosResponse<ApiResponse>
): boolean {
  return isApiResponseSuccess(response.data);
}

/**
 * Checks if an api response object is success or not.
 * @param response Api Response to verify the status codes against.
 * @returns true if the status.code is 1000, else false.
 */
export function isApiResponseSuccess(response: ApiResponse): boolean {
  return response.status.code === ApiResponseCode.CODE_1000;
}

/**
 * Check the status.code of the response against an array of status codes.
 * @param response Response to verify the status codes against.
 * @param validStatusCodes The list of valid status codes.
 * @returns true if the status.code is included in the valid status code list, else false.
 */
export function isStatusCodeValid(
  response: AxiosResponse<ApiResponse>,
  validStatusCodes: number[]
): boolean {
  return validStatusCodes.includes(response.data.status.code);
}
