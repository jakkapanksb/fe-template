import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseTransformer,
} from "axios";
import { createLogger, environment } from "../../utils";
import { HEADER_CONTENT_TYPE, HEADER_PLATFORM } from "./config/constants";
import baseTransformer from "./utils/baseTransformer";
import { isApiResponseSuccess } from "./utils/responseUtils";

/**
 * Common headers that need to be sent for all requests of Default instance, irrespective of app.
 */
export const getCommonHeaders = (): { [key: string]: string } => {
  let commonHeaders: Record<string, string> = {
    // "accept-language": getNormalizedLanguageCode(i18next.language), // TODO: Add App language
    "Content-Type": HEADER_CONTENT_TYPE,
    platform: HEADER_PLATFORM,
  };

  return commonHeaders;
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: environment.apiBase,
  responseType: "json",
  transformResponse: (data) => data,
});

/**
 * This interface helps us to save the response transformers.
 * We only call the response transformers if the response is success.
 */
interface AxiosRequestCustomConfig extends AxiosRequestConfig {
  responseTransformers: AxiosResponseTransformer[];
}

/**********************************************/
// Interceptors
/**********************************************/

const logger = createLogger("api:interceptor");

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const { url, headers, transformResponse } = config;

  // Remove the transformers before making the request.
  // These will be run again when the request is successful.
  if (url != null) {
    if (transformResponse == null) {
      (config as AxiosRequestCustomConfig).responseTransformers = [];
    } else {
      (config as AxiosRequestCustomConfig).responseTransformers = Array.isArray(
        transformResponse
      )
        ? transformResponse
        : [transformResponse];
      config.transformResponse = undefined;
    }
  }

  Object.assign(headers, {
    ...getCommonHeaders(),
  });

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // on fulfilled
    logger.log("success response", response);
    const { responseTransformers } =
      response.config as AxiosRequestCustomConfig;

    const updatedResponse = { ...response };
    try {
      // Apply baseTransformer first
      updatedResponse.data = baseTransformer(updatedResponse.data);

      if (
        isApiResponseSuccess(updatedResponse.data) &&
        responseTransformers.length > 0
      ) {
        // Only run transformers if response is successful
        for (const transform of responseTransformers) {
          updatedResponse.data = transform(updatedResponse.data);
        }
      }
    } catch (error) {
      logger.error(error);
      throw error;
    }

    return updatedResponse;
  },
  async (error: AxiosError) => {
    // on rejected
    logger.log("error response", error);
    // if (error?.response?.status === 401) {
    //   const methodId = "getApi";
    //   // TODO: Show the user dialog stating he has been logged out.
    // }

    return Promise.reject(error);
  }
);

export default axiosInstance;
