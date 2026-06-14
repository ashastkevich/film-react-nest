import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  const jsonLogger = new JsonLogger();
  let log: jest.SpyInstance;

  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    log.mockReset();
  });

  it('should format log message correctly', () => {
    jsonLogger.warn('test message', 'optional param');
    const expectedResult = JSON.stringify({
      level: 'warn',
      message: 'test message',
      optionalParams: 'optional param',
    });
    expect(log).toHaveBeenCalledWith(expectedResult);
  });
  it('should format error message correctly', () => {
    jsonLogger.error('test message', 'optional param');
    const expectedResult = JSON.stringify({
      level: 'error',
      message: 'test message',
      optionalParams: 'optional param',
    });
    expect(log).toHaveBeenCalledWith(expectedResult);
  });
});
