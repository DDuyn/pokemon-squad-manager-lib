import { EnumType } from "../types";

export const randomizeEnumerator = <T extends EnumType>(
  enumerator: T
): T[keyof T] => {
  const values = Object.values(enumerator);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex] as T[keyof T];
};
