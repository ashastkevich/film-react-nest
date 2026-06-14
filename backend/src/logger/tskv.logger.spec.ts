import { TskvLogger } from './tskv.logger';

describe('JsonLogger', () => {
  const tskvLogger = new TskvLogger();
  let log: jest.SpyInstance;

  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    log.mockReset();
  });

  it('should format log message correctly', () => {
    tskvLogger.warn('test message', 'optional param');
    const expectedResult =
      'level=warn\tmessage=test message\tparams=["optional param"]\n';
    expect(log).toHaveBeenCalledWith(expectedResult);
  });
  it('should format error message correctly', () => {
    tskvLogger.error('error message', { userId: 1 }, 'context', 123);
    const expectedResult =
      'level=error\tmessage=error message\tparams=[{"userId":1},"context",123]\n';
    expect(log).toHaveBeenCalledWith(expectedResult);
  });
});
