
import type { ILogger } from '../types';

// A simple in-memory logger that implements the ILogger interface.
// This will be shared across our media player instances.
export class ConsoleLogger implements ILogger {
  private _logs: string[] = [];
  private _onLog: (logs: string[]) => void;

  constructor(onLog: (logs: string[]) => void) {
    this._onLog = onLog;
  }

  log(message: string): void {
    this._logs.push(message);
    this._onLog([...this._logs]);
  }

  clear(): void {
    this._logs = [];
    this._onLog([]);
  }
}
