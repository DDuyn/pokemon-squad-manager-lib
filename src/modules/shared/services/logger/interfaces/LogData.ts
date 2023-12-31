export interface LogInfo {
  id: string;
  level: string;
  message: string;
  method: string;
  timestamp: string;
  data: LogData;
}

export type LogData = {
  [key: string]: unknown;
};

export type Log = {
  message: string;
  method: string;
  data: LogData;
};
