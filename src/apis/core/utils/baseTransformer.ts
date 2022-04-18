import get from "lodash/get";
import ApiResponse from "../types/ApiResponse";

/**
 * Throw an error if payload doesn't contain numeric status code
 * If will help make sure that we can get the code from data.status.code
 * @param data Returned payload from API
 */
function baseTransformer<T>(data: ApiResponse<T>): ApiResponse<T> {
  // This has been done for IE11.
  // The data object was coming as string & thus the checks were failing.
  let updatedData = data;
  if (typeof data === "string") {
    updatedData = JSON.parse(data);
  }

  const statusCode = get(updatedData, "status.code");
  if (typeof statusCode !== "number" || statusCode <= 0) {
    throw new Error("Invalid response");
  }
  return updatedData;
}

export default baseTransformer;
