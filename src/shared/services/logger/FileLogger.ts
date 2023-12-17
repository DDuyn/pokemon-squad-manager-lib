import { mkdirSync, promises } from "fs";
import { injectable } from "inversify";
import path from "path";
import data from "../../../../package.json";
import { getCurrentTimeStamp } from "../GetCurrentTimestamp";
import { Log, LogInfo } from "./interfaces/LogData";
import { Logger } from "./interfaces/Logger";

@injectable()
export class FileLogger implements Logger {
  private logsDir = path.join(
    import.meta.dir,
    "../../../..",
    "logs",
    data.version
  );

  async info(log: Log): Promise<void> {
    await this.logToFile("info", log);
  }

  async error(log: Log): Promise<void> {
    await this.logToFile("error", log);
  }

  async warn(log: Log): Promise<void> {
    await this.logToFile("warn", log);
  }

  private getLogFileName(): string {
    return `${getCurrentTimeStamp()}.json`;
  }

  private getLogFilePath(): string {
    return path.join(this.logsDir, this.getLogFileName());
  }

  private async createLogsDir(): Promise<void> {
    try {
      await mkdirSync(this.logsDir, { recursive: true });
    } catch (error) {
      console.error("Error creating log folder", error);
    }
  }

  private async logToFile(level: string, log: Log): Promise<void> {
    await this.createLogsDir();
    const filePath = this.getLogFilePath();

    const existingData = await promises
      .readFile(filePath, "utf-8")
      .catch(() => "");
    const jsonData: LogInfo[] = existingData ? JSON.parse(existingData) : [];

    const { message, method, data } = log;

    const newData: LogInfo = {
      id: crypto.randomUUID(),
      level,
      message,
      method,
      timestamp: new Date().toISOString(),
      data,
    };

    jsonData.push(newData);

    await promises.writeFile(filePath, JSON.stringify(jsonData, null, 2));
  }
}
