/**
 * @param  {string} namespace The namespace attached to this log.
 * @param  {unknown} argument The argument to log.
 * @param  {unknown[]} ...extraParams The list of other arguments to log.
 */
export type LoggerFunction = (...args: unknown[]) => void;

interface Logger {
  log: LoggerFunction;
  info: LoggerFunction;
  warn: LoggerFunction;
  error: LoggerFunction;
}

export default Logger;
