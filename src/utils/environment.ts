import { Environment } from "../types";

// Added as part of index.html
// For tests, jest global config is being used.
declare const appConfig: Environment;

const environment = appConfig;

if (!environment) {
  throw new Error("Environment not injected.");
}

export default environment;
