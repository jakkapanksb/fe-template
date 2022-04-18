function isTest() {
  try {
    if (process.env.JEST_WORKER_ID) {
      return true;
    }
  } catch (err) {
    // Ignore error;
  }
  return false;
}

const appConfig = {
  id: "localDevelopment",
  isTest: isTest(), // to determine whether JEST is running in the code.
  settings: {
    apiMockDelay: 1000,
    // shouldCacheTranslation: false, // TODO: Check later if we need this flag
    // shouldLog: true, // TODO: Check later if we need this flag

    // TODO: Add this later once we have the elastic setup, or remove this if not needed.
    // elasticApmRumConfig: {
    //   serverUrl: "",
    //   serviceName: "",
    //   transactionSampleRate: 0.1,
    // },
  },
  // TODO: Add this later once we have the backend setup.
  // urls: {
  //   apiBase: "",
  //   staticContentBase: "",
  // },
};
// Make it global
window.appConfig = appConfig;