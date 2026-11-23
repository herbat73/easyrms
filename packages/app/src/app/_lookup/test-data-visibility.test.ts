import { describe, expect, it } from "vitest";

import { showTestData } from "./test-data-visibility";

describe("showTestData", () => {
  it("shows the panel when the flag is true and the source is fake", () => {
    expect(showTestData({ flag: "true", orderSource: "fake" })).toBe(true);
  });

  it.each([undefined, "", "false", "TRUE", "1", "yes", " true"])("hides the panel when the flag is %j", (flag) => {
    expect(showTestData({ flag, orderSource: "fake" })).toBe(false);
  });

  it.each([undefined, "", "shopify"])("hides the panel when the order source is %j", (orderSource) => {
    expect(showTestData({ flag: "true", orderSource })).toBe(false);
  });
});
