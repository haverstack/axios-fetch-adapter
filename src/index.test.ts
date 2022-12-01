import fetchAdapter from ".";
import { AxiosError } from "./types";

const { toString } = Object.prototype;

test("Regular GET request is successful", async () => {
  const result = await fetchAdapter({url: "http://example.com"});
  expect(result.status).toBe(200);
});

test("Failing a timeout will throw an error", async () => {
  try {
    await fetchAdapter({url: "http://example.com", timeout: 1});
    throw new Error("Timeout didn't throw");
  } catch (e: unknown) {
    const error = e as AxiosError;
    expect(error.message).toBe("timeout of 1ms exceeded");
    expect(error.config?.url).toBe("http://example.com");
    const errorJson: any = error.toJSON();
    expect(errorJson["message"]).toBe("timeout of 1ms exceeded");
  }
});

test("Set custom timeout message", async () => {
  const timeoutErrorMessage = "YOU TIMED OUT!";
  try {
    await fetchAdapter({url: "http://example.com", timeout: 1, timeoutErrorMessage});
    throw new Error("Timeout didn't throw");
  } catch (e: unknown) {
    const error = e as AxiosError;
    expect(error.message).toBe(timeoutErrorMessage);
  }
});

test("Relative URLs can be combined with a base URL", async () => {
  const result = await fetchAdapter({baseURL: "http://example.com", url: "/foo"});
  expect(result.request.url).toBe("http://example.com/foo");
});

test("Setting config response types will set response data", async () => {
  const result1 = await fetchAdapter({url: "http://example.com", responseType: "arraybuffer"});
  expect(result1.data instanceof ArrayBuffer).toBe(true);
  expect(toString.call(result1.data)).toBe("[object ArrayBuffer]");

  const result2 = await fetchAdapter({url: "http://example.com", responseType: "blob"});
  expect(result2.data instanceof Blob).toBe(true);
  expect(toString.call(result2.data)).toBe("[object Blob]");

  const result3 = await fetchAdapter({url: "https://api.artic.edu/api/v1/artworks?limit=1", responseType: "json"});
  expect(result3.data instanceof Object).toBe(true);
  expect(JSON.stringify(result3.data)).toBeTruthy();
});

test("Basic authorization will set request headers", async () => {
  const username = "foo";
  const password = "bar";
  const result1 = await fetchAdapter({url: "http://example.com", auth: {username, password}});
  expect(result1.request.headers.get("authorization")).toBe("Basic Zm9vOmJhcg==");

  const result2 = await fetchAdapter({url: "http://example.com", auth: {username: "", password: ""}});
  expect(result2.request.headers.get("authorization")).toBe("Basic Og==");
});

test("Custom validation can be set for responses", async () => {
  try {
    // Always fail the request
    await fetchAdapter({url: "http://example.com", validateStatus: (_: number) => {
      return false;
    }});
    throw new Error("Validation didn't throw");
  } catch (e: unknown) {
    const error = e as AxiosError;
    expect(error.message).toBe("Request failed with status code 200");
  }
});

test("Invalid request will throw an error", async () => {
  try {
    await fetchAdapter({url: "http://localhost:3000"});
    throw new Error("Invalid request didn't throw");
  } catch (e: unknown) {
    const error = e as AxiosError;
    expect(error.message).toBe("Network Error");
  }
});

test("POST requests send data", async () => {
  const result = await fetchAdapter({url: "http://example.com", method: "post", data: JSON.stringify({foo: "bar"})});
  expect(result.request.method).toBe('POST');
  expect(result.request.bodyUsed).toBe(true);
});

test("Credentials options are set with `withCredentials` option", async () => {
  const result1 = await fetchAdapter({url: "http://example.com", withCredentials: true});
  // The `credentials` property of requests is not implemented on service workers...
  expect(result1.status).toBe(200);
  const result2 = await fetchAdapter({url: "http://example.com", withCredentials: false});
  // The `credentials` property of requests is not implemented on service workers...
  expect(result2.status).toBe(200);
});


