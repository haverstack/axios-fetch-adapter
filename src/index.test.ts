import fetchAdapter, { createFetchAdapter } from ".";
import type { AxiosError } from "axios";
import axios from "axios";

// Test URL
const url = "http://localhost:1";

// Utilities
const { toString } = Object.prototype;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock fetch to avoid making real network requests
const fetchSpy = jest.spyOn(globalThis, "fetch");
fetchSpy.mockImplementation(async (input: RequestInfo | URL, init?: RequestInit) => {
  const req = new Request(input, init);
  // Simulate network delay
  await delay(5);
  if (req.method === "POST") {
    const url = new URL(req.url);
    return new Response(JSON.stringify({ data: req.body, path: url.pathname }));
  }
  return new Response(JSON.stringify({ message: "success" }));
});

test("Regular GET request is successful", async () => {
  const result = await fetchAdapter({ url });
  expect(result.status).toBe(200);
  expect(result.data).toBe(JSON.stringify({ message: "success" }));
});

test("Supplying only a base URL creates a successful request", async () => {
  const result = await fetchAdapter({ baseURL: url });
  expect(result.request.url).toBe(`${url}/`);
  expect(result.status).toBe(200);
});

test("Base URLs can also include a path", async () => {
  const result = await fetchAdapter({ baseURL: `${url}/foo`, url: "/bar" });
  expect(result.request.url).toBe(`${url}/foo/bar`);
});

test("Request completes successfully if timeout is set", async () => {
  const result = await fetchAdapter({ url, timeout: 1500 });
  expect(result.status).toBe(200);
  expect(result.data).toBe(JSON.stringify({ message: "success" }));
});

test("Failing a timeout will throw an error", async () => {
  try {
    await fetchAdapter({ url, timeout: 1 });
    throw new Error("Timeout didn't throw");
  } catch (e: unknown) {
    const error = e as AxiosError;
    expect(error.message).toBe("timeout of 1ms exceeded");
    expect(error.code).toBe("ETIMEDOUT");
    expect(error.config?.url).toBe(url);
    // Use this opportunity to test JSON output as well
    const errorJson: any = error.toJSON();
    expect(errorJson.message).toBe("timeout of 1ms exceeded");
  }
});

test("Set custom timeout message", async () => {
  const timeoutErrorMessage = "YOU TIMED OUT!";
  try {
    await fetchAdapter({ url, timeout: 1, timeoutErrorMessage });
    throw new Error("Timeout didn't throw");
  } catch (e: unknown) {
    const error = e as AxiosError;
    expect(error.message).toBe(timeoutErrorMessage);
  }
});

test("Setting config response types will set response data", async () => {
  const result1 = await fetchAdapter({ url, responseType: "arraybuffer" });
  expect(result1.data instanceof ArrayBuffer).toBe(true);
  expect(toString.call(result1.data)).toBe("[object ArrayBuffer]");

  const result2 = await fetchAdapter({ url, responseType: "blob" });
  expect(result2.data instanceof Blob).toBe(true);
  expect(toString.call(result2.data)).toBe("[object Blob]");

  const result3 = await fetchAdapter({ url, responseType: "json" });
  expect(result3.data instanceof Object).toBe(true);
  expect(result3.data).toEqual({ message: "success" });
});

test("Basic authorization will set request headers", async () => {
  const username = "foo";
  const password = "bar";
  const result1 = await fetchAdapter({ url, auth: { username, password } });
  expect(result1.request.headers.get("authorization")).toBe("Basic Zm9vOmJhcg==");

  const result2 = await fetchAdapter({ url, auth: { username: "", password: "" } });
  expect(result2.request.headers.get("authorization")).toBe("Basic Og==");
});

test("Custom validation can be set for responses", async () => {
  try {
    // Always fail the request
    await fetchAdapter({
      url,
      validateStatus: (_: number) => {
        return false;
      }
    });
    throw new Error("Validation didn't throw");
  } catch (e: unknown) {
    const error = e as AxiosError;
    expect(error.message).toBe("Request failed with status code 200");
    expect(error.code).toBe("ERR_BAD_OPTION");
    // Use this opportunity to test non-null statuses
    const errorJson: any = error.toJSON();
    expect(errorJson.status).toBeTruthy();
  }
});

test("POST requests send data", async () => {
  const result = await fetchAdapter({ url, method: "post", data: JSON.stringify({ foo: "bar" }) });
  expect(result.request.method).toBe("POST");
  expect(result.request.bodyUsed).toBe(true);
});

test("Credentials options are set with `withCredentials` option", async () => {
  // Per the Cloudflare Workers runtime, the `credentials` property won't be
  // implemented because it doesn't make sense in this environment:
  // https://github.com/cloudflare/workerd/blob/4e5a05813d4336b15826fd3bda7faedf829c830c/src/workerd/api/http.h#L491-L498
  const result1 = await fetchAdapter({ url, withCredentials: true });
  expect(result1.status).toBe(200);

  const result2 = await fetchAdapter({ url, withCredentials: false });
  expect(result2.status).toBe(200);
});

test("Serialization set with `paramsSerializer` produces correct results", async () => {
  const paramsSerializer = (value: any) => {
    if (typeof value == "object") {
      const outputPairs = [];
      for (const key in value) {
        outputPairs.push(`${key}=${value[key]}`);
      }
      return outputPairs.join("&");
    }
    if (typeof value == "number") {
      return value.toString();
    }
    return value;
  };
  const result = await fetchAdapter({
    url,
    params: { foo: 100 },
    paramsSerializer
  });
  expect(result.request.url).toBe(`${url}/?foo=100`);
});

test("Can set custom `fetch` functions", async () => {
  const testMsg = "Custom fetch!";
  const myFetch = async (_: RequestInfo | URL) => {
    return new Response(testMsg);
  };
  const axiosInstance = axios.create({ adapter: createFetchAdapter({ fetch: myFetch }) });
  const result = await axiosInstance.get(url);
  expect(result.data).toBe(testMsg);
});

test("Headers are passed to Axios", async () => {
  const result = await fetchAdapter({ url, headers: { "Content-Type": "application/json" } });
  expect(result.request.headers.get("Content-Type")).toBe("application/json");
});

test("Default adapter throws for relative URLs with no base", async () => {
  try {
    await fetchAdapter({ url: "/bar" });
    throw new Error("Invalid request didn't throw");
  } catch (e: unknown) {
    const error = e as TypeError;
    expect(error.message).toBe("Failed to parse URL from /bar");
  }
});

test("Can disable Request object creation for custom adapters", async () => {
  const myFetch = async (_: RequestInfo | URL) => new Response("Custom fetch!");
  const customAdapter = createFetchAdapter({ fetch: myFetch, disableRequest: true });
  const result = await customAdapter({ url: "/bar" });
  expect(result.request).toBe("/bar");
  expect(result.status).toBe(200);
});

test("Invalid request will throw an error", async () => {
  // Disables fetch mock for the rest of this file
  jest.restoreAllMocks();
  try {
    await fetchAdapter({ url });
    throw new Error("Invalid request didn't throw");
  } catch (e: unknown) {
    const error = e as AxiosError;
    expect(error.message).toBe("Network Error");
    expect(error.code).toBe("ERR_NETWORK");
  }
});
