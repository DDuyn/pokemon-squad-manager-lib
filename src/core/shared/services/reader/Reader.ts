export interface Reader {
  readDirSync(dirPath: string): string[];
  readFileSync<T>(filePath: string): T;
  readDirAsync(dirPath: string): Promise<string[]>;
  readFileAsync<T>(filePath: string): Promise<T>;
}
