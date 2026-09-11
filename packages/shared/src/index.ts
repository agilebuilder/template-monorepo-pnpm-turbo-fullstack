/** 统一 API 响应包装类型 */
export interface ApiResult<T> {
  ok: boolean;
  data: T;
  message?: string;
}

/** 构造成功的 API 响应 */
export function createResult<T>(data: T, message?: string): ApiResult<T> {
  return message === undefined ? { ok: true, data } : { ok: true, data, message };
}

/** 生成问候语 */
export function formatGreeting(name: string): string {
  const trimmed = name.trim();
  return `Hello, ${trimmed.length > 0 ? trimmed : "world"}!`;
}

/** 将字符串转为 kebab-case（可用于生成路由、包名片段等） */
export function kebabCase(input: string): string {
  return input
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

/** 异步等待 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
