import ApiMockConfig from '../types/ApiMockConfig';
import generateGetMocks from './generateGetMocks';

describe('generateGetMocks', () => {
  const config1: ApiMockConfig = {
    method: 'get',
    endpoint: '/test1',
    data: {
      status: { code: 1000, description: 'Success' },
      data: undefined,
    },
  };

  const config2: ApiMockConfig = {
    method: 'post',
    endpoint: '/test2',
    data: {
      status: { code: 1000, description: 'Success' },
      data: undefined,
    },
  };

  const config3: ApiMockConfig = {
    method: 'delete',
    endpoint: '/test2',
    data: {
      status: { code: 1000, description: 'Success' },
      data: undefined,
    },
  };

  it('should return getMocks function', async () => {
    const getMocks = generateGetMocks({
      api1: config1,
      api2: [config2, config3],
    });
    expect(getMocks).toBeInstanceOf(Function);
  });

  it('should return all configs when called with "true"', async () => {
    const getMocks = generateGetMocks({
      api1: config1,
      api2: [config2, config3],
    });
    expect(getMocks(true)).toEqual([config1, config2, config3]);
  });

  it('should only return configs from specified key', async () => {
    const getMocks = generateGetMocks({
      api1: config1,
      api2: [config2, config3],
    });
    expect(getMocks(['api2'])).toEqual([config2, config3]);
  });

  it('should return empty array when called with "false"', async () => {
    const getMocks = generateGetMocks({
      api1: config1,
      api2: [config2, config3],
    });
    expect(getMocks(false)).toEqual([]);
  });
});
