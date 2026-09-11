import { describe, expect, it } from "vitest";

import { createResult, formatGreeting, kebabCase } from "../src/index";

describe("formatGreeting", () => {
  it("返回带名字的问候语", () => {
    expect(formatGreeting("AgileBuilder")).toBe("Hello, AgileBuilder!");
  });

  it("空白名字回退为 world", () => {
    expect(formatGreeting("   ")).toBe("Hello, world!");
  });
});

describe("createResult", () => {
  it("包装数据并标记 ok", () => {
    const result = createResult({ greeting: "hi" });
    expect(result.ok).toBe(true);
    expect(result.data.greeting).toBe("hi");
  });
});

describe("kebabCase", () => {
  it("转换驼峰与空格", () => {
    expect(kebabCase("HelloWorld App")).toBe("hello-world-app");
  });
});
