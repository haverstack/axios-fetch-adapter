import { combineURLs, isAbsoluteURL, buildFullPath } from "./axiosHelpers";

test("Base URL can be combined with relative URL", () => {
  expect(combineURLs("http://example.com/", "/foo/bar")).toBe("http://example.com/foo/bar");
  expect(combineURLs("http://example.com", "foo/bar")).toBe("http://example.com/foo/bar");
});

test("Absolute and relative URLs are determined correctly", () => {
  expect(isAbsoluteURL("http://example.com")).toBe(true);
  expect(isAbsoluteURL("/foo/bar")).toBe(false);
  expect(isAbsoluteURL("ftp://example.com")).toBe(true);
  expect(isAbsoluteURL("foo/bar")).toBe(false);
});

test("URLs can be built from a combination of base URLs and relative URLs", () => {
  expect(buildFullPath("http://example.com")).toBe("http://example.com");
  expect(buildFullPath("", "http://example.com")).toBe("http://example.com");
  expect(buildFullPath("/bar", "http://example.com/foo")).toBe("http://example.com/foo/bar");
});
