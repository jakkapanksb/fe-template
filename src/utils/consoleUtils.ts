interface Window {
  console: Console;
  toggleConsole?: (value: string) => void;
}

const enableLogKey = "enableLog";

const actualConsole = console;
const windowToUpdate = window as Window & typeof globalThis;

const emptyFunction = (): void => {
  // No implementation
};

const disabledConsole = {
  ...actualConsole,
  group: emptyFunction,
  debug: emptyFunction,
  error: emptyFunction,
  info: emptyFunction,
  log: emptyFunction,
  warn: emptyFunction,
} as Console;

/**
 * Allow to toggle console log if required.
 * @param  {string} value Pass key to enable the log
 */
windowToUpdate.toggleConsole = (value: string) => {
  toggleConsole(value === enableLogKey);
};
/**
 * Toggle the console to be off/on.
 * @param  {boolean} value If true, the actual console will be available to user, else a disabled console.
 * @returns void
 */
export function toggleConsole(value: boolean): void {
  if (value) {
    windowToUpdate.console = actualConsole;
  } else {
    windowToUpdate.console = disabledConsole;
  }
}

/**
 * For all libraries that need access to console.
 * @returns Console The console object
 */
export function getConsole(): Console {
  return windowToUpdate.console;
}
