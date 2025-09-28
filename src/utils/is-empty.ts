export const isEmpty = (input: unknown): boolean => {
  if (input === null || input === undefined) return true;

  if (typeof input === "string") return input.trim().length === 0;

  if (Array.isArray(input)) return input.length === 0;

  if (isObject(input)) return Object.keys(input).length === 0;

  return false;
};

export const isObject = (input: unknown) =>
  typeof input === "object" && input !== null && !Array.isArray(input);
