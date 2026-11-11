/** Unified API response wrapper type */
export interface ApiResult<T> {
  ok: boolean;
  data: T;
  message?: string;
}

/** Build a successful API response */
export function createResult<T>(data: T, message?: string): ApiResult<T> {
  return message === undefined ? { ok: true, data } : { ok: true, data, message };
}

/** Build a greeting message */
export function formatGreeting(name: string): string {
  const trimmed = name.trim();
  return `Hello, ${trimmed.length > 0 ? trimmed : "world"}!`;
}

/** Convert a string to kebab-case (useful for route paths, package name segments, etc.) */
export function kebabCase(input: string): string {
  return input
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

/** Wait asynchronously */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
