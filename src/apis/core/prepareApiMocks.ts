// This file is imported by App.tsx in order to prepare the mocks

// import { environment } from "../../utils/";
import ApiMockConfig from "./types/ApiMockConfig";
import setupMocks from "./utils/setupMocks";
import { environment } from "../../utils";
import sampleMock from "./../sample/mocks/getMocks";

const shouldUseMock = environment.settings.shouldMockApiResponse;

const apiMocks: ApiMockConfig[] = [
  // call getMocks with:
  // - true: enable mocking
  // - false: disable mocking
  // - array of string (mock keys): enable only specific mock
  // TODO: import arrays of ApiMockConfig from other features and add them here.
  ...sampleMock(shouldUseMock),
];

setupMocks(apiMocks);
