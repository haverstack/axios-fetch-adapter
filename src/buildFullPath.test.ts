import { buildFullPath } from "./buildFullPath";

test("URLs can be built from a combination of base URLs and relative URLs", () => {
  expect(buildFullPath("http://example.com")).toBe("http://example.com");
  expect(buildFullPath("", "http://example.com")).toBe("http://example.com");
  expect(buildFullPath("/bar", "http://example.com/foo")).toBe("http://example.com/foo/bar");
});
