import { createLogger, environment } from "../../../utils";
import AxiosMockAdapter from "axios-mock-adapter";
import camelCase from "lodash/camelCase";
import axiosInstance from "../axiosInstance";
import ApiMockConfig from "../types/ApiMockConfig";
import ApiResponse from "../types/ApiResponse";

function setupMocks(
  mocksConfig: ApiMockConfig[],
  delayResponse = environment.settings.apiMockDelay
): void {
  const logger = createLogger("api:mock");

  // We only setup mocks during local development.
  if (environment.id !== "localDevelopment") {
    return;
  }

  const instance = axiosInstance;
  const mock = new AxiosMockAdapter(instance, { delayResponse });
  mocksConfig.forEach(({ data, endpoint, method }) => {
    const mockMethod = camelCase(`on ${method}`) as
      | "onDelete"
      | "onGet"
      | "onPatch"
      | "onPost"
      | "onPut";
    if (typeof mock[mockMethod] !== "function") return;
    mock[mockMethod](endpoint).reply(async (config) => {
      let response: ApiResponse;
      if (typeof data === "function") {
        response = await data(config);
      } else {
        response = data;
      }
      const httpMethod = (config.method || "").toUpperCase();
      if (!environment.isTest) {
        logger.info(
          `${httpMethod} ${config.url}`,
          "\nRequest Config:",
          config,
          "\nResponse:",
          response
        );
      }

      return [200, response, {}];
    });
  });
  mock.onAny().passThrough();
}

export default setupMocks;
