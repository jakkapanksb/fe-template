import Debug from "debug";
import Logger, { LoggerFunction } from "../apis/core/types/Logger";
import { getConsole } from "./consoleUtils";

// Custom logger
type LoggerColor = { [key in keyof Logger]: string };

const loggerColor: LoggerColor = {
  log: "black",
  info: "blue",
  warn: "orange",
  error: "red",
};

// Pretty-print an Object all on a single line.
// https://github.com/visionmedia/debug#formatters
const logFormatter = "%o";
const namespacePrefix = "app:";

/**
 * @param  {string} color Color associated with this log
 * @returns LoggerFunction Function which will write to the console
 */
function logToConsole(
  logger: Debug.Debugger,
  type: keyof Logger
): LoggerFunction {
  return (...args: unknown[]) => {
    const console = getConsole();
    // Replacing the console object should not affect the logger
    logger.log = console[type].bind(console);
    logger.color = loggerColor[type];
    logger(logFormatter, ...args);
  };
}

function createLogger(namespace: string): Logger {
  const logger = Debug(`${namespacePrefix}${namespace}`);

  return {
    log: logToConsole(logger, "log"),
    info: logToConsole(logger, "info"),
    warn: logToConsole(logger, "warn"),
    error: logToConsole(logger, "error"),
  };
}

export default createLogger;
