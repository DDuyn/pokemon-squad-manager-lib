import { Log } from "./LogData";

export interface Logger {
  info: (log: Log) => Promise<void>;
  error: (log: Log) => Promise<void>;
  warn: (log: Log) => Promise<void>;
}
