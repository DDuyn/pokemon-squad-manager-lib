export const getKey = <T, K extends keyof T>(
  object: T,
  keyValue: K
): K | undefined => {
  for (const key in object) {
    if (object[key] === keyValue) {
      return key as unknown as K;
    }
  }
  return undefined;
};
