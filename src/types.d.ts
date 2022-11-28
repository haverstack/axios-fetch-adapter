// Source: https://github.com/axios/axios/blob/v1.x/index.d.ts
// Accessed: 2022-11-27

// Axios License Text:
/*
# Copyright (c) 2014-present Matt Zabriskie & Collaborators

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// TypeScript Version: 4.7
type AxiosHeaderValue = AxiosHeaders | string | string[] | number | boolean | null;
type RawAxiosHeaders = Record<string, AxiosHeaderValue>;

type MethodsHeaders = {
  [Key in Method as Lowercase<Key>]: AxiosHeaders;
};

interface CommonHeaders {
  common: AxiosHeaders;
}

type AxiosHeaderMatcher = (
  this: AxiosHeaders,
  value: string,
  name: string,
  headers: RawAxiosHeaders
) => boolean;

type AxiosHeaderSetter = (
  value: AxiosHeaderValue,
  rewrite?: boolean | AxiosHeaderMatcher
) => AxiosHeaders;

type AxiosHeaderGetter =
  | ((parser?: RegExp) => RegExpExecArray | null)
  | ((matcher?: AxiosHeaderMatcher) => AxiosHeaderValue);

type AxiosHeaderTester = (matcher?: AxiosHeaderMatcher) => boolean;

export class AxiosHeaders {
  constructor(headers?: RawAxiosHeaders | AxiosHeaders);

  set(
    headerName?: string,
    value?: AxiosHeaderValue,
    rewrite?: boolean | AxiosHeaderMatcher
  ): AxiosHeaders;
  set(headers?: RawAxiosHeaders | AxiosHeaders, rewrite?: boolean): AxiosHeaders;

  get(headerName: string, parser: RegExp): RegExpExecArray | null;
  get(headerName: string, matcher?: true | AxiosHeaderMatcher): AxiosHeaderValue;

  has(header: string, matcher?: true | AxiosHeaderMatcher): boolean;

  delete(header: string | string[], matcher?: AxiosHeaderMatcher): boolean;

  clear(): boolean;

  normalize(format: boolean): AxiosHeaders;

  concat(...targets: Array<AxiosHeaders | RawAxiosHeaders | string>): AxiosHeaders;

  toJSON(asStrings?: boolean): RawAxiosHeaders;

  static from(thing?: AxiosHeaders | RawAxiosHeaders | string): AxiosHeaders;

  static accessor(header: string | string[]): AxiosHeaders;

  static concat(...targets: Array<AxiosHeaders | RawAxiosHeaders | string>): AxiosHeaders;

  setContentType: AxiosHeaderSetter;
  getContentType: AxiosHeaderGetter;
  hasContentType: AxiosHeaderTester;

  setContentLength: AxiosHeaderSetter;
  getContentLength: AxiosHeaderGetter;
  hasContentLength: AxiosHeaderTester;

  setAccept: AxiosHeaderSetter;
  getAccept: AxiosHeaderGetter;
  hasAccept: AxiosHeaderTester;

  setUserAgent: AxiosHeaderSetter;
  getUserAgent: AxiosHeaderGetter;
  hasUserAgent: AxiosHeaderTester;

  setContentEncoding: AxiosHeaderSetter;
  getContentEncoding: AxiosHeaderGetter;
  hasContentEncoding: AxiosHeaderTester;
}

export type RawAxiosRequestHeaders = Partial<RawAxiosHeaders & MethodsHeaders & CommonHeaders>;

export type AxiosRequestHeaders = Partial<RawAxiosHeaders & MethodsHeaders & CommonHeaders> &
  AxiosHeaders;

export type RawAxiosResponseHeaders = Partial<
  Record<string, string> & {
    "set-cookie"?: string[];
  }
>;

export type AxiosResponseHeaders = RawAxiosResponseHeaders & AxiosHeaders;

export interface AxiosRequestTransformer {
  (this: AxiosRequestConfig, data: any, headers: AxiosRequestHeaders): any;
}

export interface AxiosResponseTransformer {
  (this: AxiosRequestConfig, data: any, headers: AxiosResponseHeaders, status?: number): any;
}

export interface AxiosAdapter {
  (config: AxiosRequestConfig): AxiosPromise;
}

export interface AxiosBasicCredentials {
  username: string;
  password: string;
}

export interface AxiosProxyConfig {
  host: string;
  port: number;
  auth?: {
    username: string;
    password: string;
  };
  protocol?: string;
}

export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

export type ResponseType = "arraybuffer" | "blob" | "document" | "json" | "text" | "stream";

export type responseEncoding =
  | "ascii"
  | "ASCII"
  | "ansi"
  | "ANSI"
  | "binary"
  | "BINARY"
  | "base64"
  | "BASE64"
  | "base64url"
  | "BASE64URL"
  | "hex"
  | "HEX"
  | "latin1"
  | "LATIN1"
  | "ucs-2"
  | "UCS-2"
  | "ucs2"
  | "UCS2"
  | "utf-8"
  | "UTF-8"
  | "utf8"
  | "UTF8"
  | "utf16le"
  | "UTF16LE";

export interface TransitionalOptions {
  silentJSONParsing?: boolean;
  forcedJSONParsing?: boolean;
  clarifyTimeoutError?: boolean;
}

export interface GenericAbortSignal {
  readonly aborted: boolean;
  onabort?: ((...args: any) => any) | null;
  addEventListener?: (...args: any) => any;
  removeEventListener?: (...args: any) => any;
}

export interface FormDataVisitorHelpers {
  defaultVisitor: SerializerVisitor;
  convertValue: (value: any) => any;
  isVisitable: (value: any) => boolean;
}

export interface SerializerVisitor {
  (
    this: GenericFormData,
    value: any,
    key: string | number,
    path: null | Array<string | number>,
    helpers: FormDataVisitorHelpers
  ): boolean;
}

export interface SerializerOptions {
  visitor?: SerializerVisitor;
  dots?: boolean;
  metaTokens?: boolean;
  indexes?: boolean | null;
}

// tslint:disable-next-line
export interface FormSerializerOptions extends SerializerOptions {}

export interface ParamEncoder {
  (value: any, defaultEncoder: (value: any) => any): any;
}

export interface CustomParamsSerializer {
  (params: Record<string, any>, options?: ParamsSerializerOptions): string;
}

export interface ParamsSerializerOptions extends SerializerOptions {
  encode?: ParamEncoder;
  serialize?: CustomParamsSerializer;
}

type MaxUploadRate = number;

type MaxDownloadRate = number;

export interface AxiosProgressEvent {
  loaded: number;
  total?: number;
  progress?: number;
  bytes: number;
  rate?: number;
  estimated?: number;
  upload?: boolean;
  download?: boolean;
  event?: ProgressEvent;
}

type Milliseconds = number;

type AxiosAdapterName = "xhr" | "http" | string;

type AxiosAdapterConfig = AxiosAdapter | AxiosAdapterName;

export interface AxiosRequestConfig<D = any> {
  url?: string;
  method?: Method | string;
  baseURL?: string;
  transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
  transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
  headers?: RawAxiosRequestHeaders;
  params?: any;
  paramsSerializer?: ParamsSerializerOptions;
  data?: D;
  timeout?: Milliseconds;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  adapter?: AxiosAdapterConfig | AxiosAdapterConfig[];
  auth?: AxiosBasicCredentials;
  responseType?: ResponseType;
  responseEncoding?: responseEncoding | string;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
  maxContentLength?: number;
  validateStatus?: ((status: number) => boolean) | null;
  maxBodyLength?: number;
  maxRedirects?: number;
  maxRate?: number | [MaxUploadRate, MaxDownloadRate];
  beforeRedirect?: (
    options: Record<string, any>,
    responseDetails: { headers: Record<string, string> }
  ) => void;
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: AxiosProxyConfig | false;
  cancelToken?: CancelToken;
  decompress?: boolean;
  transitional?: TransitionalOptions;
  signal?: GenericAbortSignal;
  insecureHTTPParser?: boolean;
  env?: {
    FormData?: new (...args: any[]) => object;
  };
  formSerializer?: FormSerializerOptions;
}

export interface HeadersDefaults {
  common: RawAxiosRequestHeaders;
  delete: RawAxiosRequestHeaders;
  get: RawAxiosRequestHeaders;
  head: RawAxiosRequestHeaders;
  post: RawAxiosRequestHeaders;
  put: RawAxiosRequestHeaders;
  patch: RawAxiosRequestHeaders;
  options?: RawAxiosRequestHeaders;
  purge?: RawAxiosRequestHeaders;
  link?: RawAxiosRequestHeaders;
  unlink?: RawAxiosRequestHeaders;
}

export interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}

export class AxiosError<T = unknown, D = any> extends Error {
  constructor(
    message?: string,
    code?: string,
    config?: AxiosRequestConfig<D>,
    request?: any,
    response?: AxiosResponse<T, D>
  );

  config?: AxiosRequestConfig<D>;
  code?: string;
  request?: any;
  response?: AxiosResponse<T, D>;
  isAxiosError: boolean;
  status?: number;
  toJSON: () => object;
  cause?: Error;
  static readonly ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
  static readonly ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
  static readonly ERR_BAD_OPTION = "ERR_BAD_OPTION";
  static readonly ERR_NETWORK = "ERR_NETWORK";
  static readonly ERR_DEPRECATED = "ERR_DEPRECATED";
  static readonly ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
  static readonly ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
  static readonly ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
  static readonly ERR_INVALID_URL = "ERR_INVALID_URL";
  static readonly ERR_CANCELED = "ERR_CANCELED";
  static readonly ECONNABORTED = "ECONNABORTED";
  static readonly ETIMEDOUT = "ETIMEDOUT";
}

export type AxiosPromise<T = any> = Promise<AxiosResponse<T>>;

export interface Cancel {
  message: string | undefined;
}

export interface CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;
  throwIfRequested(): void;
}

export interface GenericFormData {
  append(name: string, value: any, options?: any): any;
}
