export interface Logger {
  log: (message: string) => Promise<void>;
  error: (message: string) => Promise<void>;
  warn: (message: string) => Promise<void>;
}
