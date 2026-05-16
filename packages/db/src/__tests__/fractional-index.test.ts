import { expect, test, describe } from "vitest";
import { generateFractionalIndex } from "../fractional-index.js";

describe("generateFractionalIndex", () => {
  test("generates between two characters", () => {
    const mid = generateFractionalIndex("a", "b");
    expect(mid > "a").toBe(true);
    expect(mid < "b").toBe(true);
  });

  test("generates before a character", () => {
    expect(generateFractionalIndex(null, "a") < "a").toBe(true);
  });

  test("generates after a character", () => {
    expect(generateFractionalIndex("b", null) > "b").toBe(true);
  });

  test("throws on invalid range", () => {
    expect(() => generateFractionalIndex("b", "a")).toThrow();
    expect(() => generateFractionalIndex("a", "a")).toThrow();
  });

  test("handles longer strings", () => {
    const mid = generateFractionalIndex("a", "a0");
    expect(mid > "a").toBe(true);
    expect(mid < "a0").toBe(true);
  });

  test("handles prefix strings correctly", () => {
    const mid = generateFractionalIndex("a", "a!");
    expect(mid > "a").toBe(true);
    expect(mid < "a!").toBe(true);
  });

  test("generates sequence of items", () => {
    let current = "a";
    for (let i = 0; i < 50; i++) {
      const next = generateFractionalIndex(current, "b");
      expect(next > current).toBe(true);
      expect(next < "b").toBe(true);
      current = next;
    }
  });
});
