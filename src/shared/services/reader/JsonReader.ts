import { readFileSync, readdirSync } from "fs";
import { injectable } from "inversify";

import { Reader } from "./Reader";

@injectable()
export class JsonReader implements Reader {
  constructor() {}

  async readDirAsync(dirPath: string): Promise<string[]> {
    return readdirSync(dirPath);
  }

  async readFileAsync<T>(filePath: string): Promise<T> {
    const data = (await Bun.file(filePath).json()) as T;
    return data;
  }

  readDirSync(dirPath: string): string[] {
    return readdirSync(dirPath);
  }

  readFileSync<T>(filePath: string): T {
    const data = readFileSync(filePath, "utf-8");
    return JSON.parse(data) as T;
  }
}
