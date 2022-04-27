import ApiResponse from "../types/ApiResponse";
import ApiResponseStatus from "../types/ApiResponseStatus";
import baseTransformer from "./baseTransformer";

describe("baseTransformer", () => {
  const status: ApiResponseStatus = {
    code: 1000,
    header: "sample header",
    description: "sample description",
  };

  it("should throw error if status.code is not defined", () => {
    const codeUndefined = { ...status, code: undefined };
    console.log("HEllo");
    try {
      baseTransformer({
        status: codeUndefined as unknown as ApiResponseStatus,
        data: {},
      });
    } catch (e) {
      console.log(e);
    }
    expect(
      baseTransformer({
        status: codeUndefined as unknown as ApiResponseStatus,
        data: {},
      })
    ).toThrow();
  });

  it("should throw error if status.code is not a number", () => {
    const codeNotANumber = { ...status, code: "not a number" };
    expect(
      baseTransformer({
        status: codeNotANumber as unknown as ApiResponseStatus,
        data: {},
      })
    ).toThrowError();
  });

  it("should throw error if status.code is less than equal to 0", () => {
    const invalidCode = { ...status, code: 0 };
    expect(baseTransformer({ status: invalidCode, data: {} })).toThrowError();
  });

  it("should not change the response if status.code is valid", () => {
    const sampleResponse = { status, data: { test: "" } };
    const response = baseTransformer(sampleResponse);
    expect(response).toBe(sampleResponse);
  });

  it("should parse if the response is in string & validate", () => {
    const responseJson = {
      status: {
        code: 1000,
        header: "testHeader",
        description: "sample description",
      },
      data: "",
    };
    const sampleResponse = JSON.stringify(
      responseJson
    ) as unknown as ApiResponse<{}>;
    const actualResponse = baseTransformer(sampleResponse);
    expect(actualResponse).toEqual(responseJson);
  });
});
