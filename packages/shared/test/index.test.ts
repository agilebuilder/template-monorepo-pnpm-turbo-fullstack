import { describe, expect, it } from "vitest";

import { createResult, formatGreeting, kebabCase } from "../src/index";

describe("formatGreeting", () => {
  it("returns a greeting with the given name", () => {
    expect(formatGreeting("AgileBuilder")).toBe("Hello, AgileBuilder!");
  });

  it("falls back to world for blank names", () => {
    expect(formatGreeting("   ")).toBe("Hello, world!");
  });
});

describe("createResult", () => {
  it("wraps data and marks it ok", () => {
    const result = createResult({ greeting: "hi" });
    expect(result.ok).toBe(true);
    expect(result.data.greeting).toBe("hi");
  });
});

describe("kebabCase", () => {
  it("converts camel case and spaces", () => {
    expect(kebabCase("HelloWorld App")).toBe("hello-world-app");
  });
});
