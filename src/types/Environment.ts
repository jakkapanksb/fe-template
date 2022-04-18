export interface Environment {
  id: string;
  // true if we are running local tests on the environment.
  isTest?: boolean;

  settings: Settings;
  urls: Urls;
}

export interface Urls {
  apiBase: string;
  staticContentBase: string;
}

export interface Settings {
  shouldMockApiResponse: boolean;
  apiMockDelay?: number;

  shouldCacheTranslation: boolean;
  shouldLog: boolean;

  // Third party integrations
  elasticApmRumConfig?: ElasticApmRumConfig;
}

export interface ElasticApmRumConfig {
  serviceName: string;
  serverUrl: string;
  transactionSampleRate: number;
}
