export interface Cache<T> {
  get(key: string): Promise<T>;
  set(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}
