import { injectable } from "inversify";
import { Cache } from "./Cache";

@injectable()
export class JsonCache<T> implements Cache<T> {
  private cache = new Map<string, T>();

  constructor() {}

  async get(key: string): Promise<T | undefined> {
    return this.cache.get(key) as T;
  }

  async set(key: string, value: T): Promise<void> {
    await this.cache.set(key, value);
  }

  async delete(key: string): Promise<void> {
    await this.cache.delete(key);
  }

  async clear(): Promise<void> {
    await this.cache.clear();
  }
}
