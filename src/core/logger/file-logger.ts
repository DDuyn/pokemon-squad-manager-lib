import { mkdirSync, promises } from "fs";
import { injectable } from "inversify";
import path from "path";
import data from "../../../package.json";
import { getCurrentTimeStamp } from "../shared/services";
import { Logger } from "./interfaces/logger";

@injectable()
export class FileLogger implements Logger {
  private logsDir = path.join(__dirname, "../../..", "logs", data.version);

  async log(message: string): Promise<void> {
    await this.logToFile("log", message);
  }

  async error(message: string): Promise<void> {
    await this.logToFile("error", message);
  }

  async warn(message: string): Promise<void> {
    await this.logToFile("warn", message);
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

  private async logToFile(level: string, message: string): Promise<void> {
    await this.createLogsDir();
    const filePath = this.getLogFilePath();

    const existingData = await promises
      .readFile(filePath, "utf-8")
      .catch(() => "");
    const jsonData = existingData ? JSON.parse(existingData) : [];

    const newData = {
      level,
      message,
      timestamp: new Date().toISOString(),
    };

    jsonData.push(newData);

    await promises.writeFile(filePath, JSON.stringify(jsonData, null, 2));
  }
}
