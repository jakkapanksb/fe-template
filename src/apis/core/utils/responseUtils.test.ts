import axios, { AxiosResponse } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockDefaultSuccess from "../mocks/defaultSuccess.json";
import { ApiResponseCode } from "../types";
import ApiResponse from "../types/ApiResponse";
import {
  enhanceApiError,
  getErrorStatus,
  isApiError,
  isApiResponse,
  isApiResponseSuccess,
  isResponseSuccess,
  isStatusCodeValid,
} from "./responseUtils";

describe("responseUtils", () => {
  let mockResponse: AxiosResponse<ApiResponse<{}>>;

  beforeEach(() => {
    mockResponse = {
      config: {},
      data: {
        status: {
          code: ApiResponseCode.CODE_1000,
        },
        data: {},
      },
      headers: {},
      status: 200,
      statusText: "OK",
    };
  });

  describe("isResponseSuccess", () => {
    it("should return true if status code is 1000", () => {
      expect(isResponseSuccess(mockResponse)).toBe(true);
    });

    it("should return false if status code is not 1000", () => {
      mockResponse.data.status.code = ApiResponseCode.CODE_1999;
      expect(isResponseSuccess(mockResponse)).toBe(false);
    });
  });

  describe("isApiResponseSuccess", () => {
    it("should return true if status code is 1000", () => {
      expect(isApiResponseSuccess(mockResponse.data)).toBe(true);
    });

    it("should return false if status code is not 1000", () => {
      mockResponse.data.status.code = ApiResponseCode.CODE_1999;
      expect(isApiResponseSuccess(mockResponse.data)).toBe(false);
    });
  });

  describe("isStatusCodeValid", () => {
    it("should return true if the status code is present in the list", () => {
      expect(isStatusCodeValid(mockResponse, [1899, 1000, 2000])).toBe(true);
    });

    it("should return false if the status code is not present in the list", () => {
      expect(isStatusCodeValid(mockResponse, [1899, 7777, 2000])).toBe(false);
    });
  });

  describe("isApiError", () => {
    it("should return true for Axios error", async () => {
      const mock = new AxiosMockAdapter(axios);
      mock.onGet("/").reply(500);
      try {
        await axios.get("/");
        fail();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(isApiError(error)).toBe(true);
      }
      mock.restore();
    });

    it("should return false for other errors", async () => {
      const error = new Error();
      expect(isApiError(error)).toBe(false);
    });
  });

  describe("isApiResponse", () => {
    let mock: AxiosMockAdapter;

    beforeEach(() => {
      mock = new AxiosMockAdapter(axios);
    });

    afterEach(() => {
      mock.restore();
    });

    it("should return true for response", async () => {
      mock.onGet("/").reply(200, mockDefaultSuccess);
      const response = await axios.get("/");
      expect(isApiResponse(response.data)).toBe(true);
    });

    it("should return false for empty object", async () => {
      mock.onGet("/").reply(200, {});
      const response = await axios.get("/");
      expect(isApiResponse(response.data)).toBe(false);
    });

    it("should return false for null", async () => {
      mock.onGet("/").reply(200, null);
      const response = await axios.get("/");
      expect(isApiResponse(response.data)).toBe(false);
    });
  });

  describe("enhanceApiError", () => {
    it("should make an object that is compatiable with Axios error", async () => {
      const mock = new AxiosMockAdapter(axios);
      mock.onGet("/").reply(200, mockDefaultSuccess);
      const response = await axios.get("/");
      try {
        if (isApiResponse(response.data)) {
          throw enhanceApiError(new Error(), response);
        }
        fail();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(isApiError(error)).toBe(true);
        expect(isApiResponse(error.response.data)).toBe(true);
      }
      mock.restore();
    });
  });

  describe("getErrorStatus", () => {
    let mock: AxiosMockAdapter;

    beforeEach(() => {
      mock = new AxiosMockAdapter(axios);
    });

    afterEach(() => {
      mock.restore();
    });

    it("should return message from the response", async () => {
      const data: ApiResponse = {
        status: {
          code: 2000,
          header: "Test Message",
          description: "Test Description",
        },
      };

      mock.onGet("/").reply(500, data);
      try {
        await axios.get("/");
        fail();
      } catch (error) {
        const errorStatus = getErrorStatus(error);
        expect(errorStatus).toEqual(data.status);
      }
    });

    it("should work with enhanced error object", async () => {
      const data: ApiResponse = {
        status: {
          code: 2000,
          header: "Test Message",
          description: "Test Description",
        },
      };

      mock.onGet("/").reply(200, data);
      const response = await axios.get("/");
      const error = enhanceApiError(new Error(), response);
      const errorStatus = getErrorStatus(error);
      expect(errorStatus).toEqual(data.status);
    });

    it("should not fill the fields missing from response", async () => {
      const data: ApiResponse = {
        status: {
          code: 2000,
          description: "Test Description",
        },
      };

      mock.onGet("/").reply(500, data);
      try {
        await axios.get("/");
        fail();
      } catch (error) {
        const errorStatus = getErrorStatus(error);
        expect(errorStatus).toEqual({
          code: 2000,
          header: "",
          description: "Test Description",
        });
      }
    });

    it("should return default message with Axios error without response", async () => {
      mock.onGet("/").reply(500);
      try {
        await axios.get("/");
        fail();
      } catch (error) {
        const errorStatus = getErrorStatus(error);
        expect(errorStatus).toEqual({
          code: 0,
          header: "common.error.header",
          description: "common.error.message",
        });
      }
    });

    it("should return default message with other error", async () => {
      const errorStatus = getErrorStatus(new Error());
      expect(errorStatus).toEqual({
        code: 0,
        header: "common.error.header",
        description: "common.error.message",
      });
    });
  });
});
