import ApiMockConfig from '../types/ApiMockConfig';

type GetMocksFunction<ConfigKey> = (selectedKeys: ConfigKey[] | boolean) => ApiMockConfig[];

function generateGetMocks<ConfigKey extends string>(
  availableConfigs: Record<ConfigKey, ApiMockConfig | ApiMockConfig[]>,
): GetMocksFunction<ConfigKey> {
  const allKeys = Object.keys(availableConfigs) as ConfigKey[];

  /**
   * Returns mocks for setupMocks
   * @param selectedKeys {ConfigKey[] | boolean} Array of config keys to mock, or "true" to mock all, "false" to disable mocking
   */
  return (selectedKeys) =>
    allKeys.reduce((collection: ApiMockConfig[], key) => {
      if (selectedKeys === true || (Array.isArray(selectedKeys) && selectedKeys.includes(key))) {
        const config = availableConfigs[key];
        if (Array.isArray(config)) {
          return [...collection, ...config];
        }
        return [...collection, config];
      }
      return collection;
    }, []);
}

export default generateGetMocks;
