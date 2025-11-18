import '@testing-library/jest-dom/vitest';

// Ensure Web Crypto is available for jose in tests.
if (typeof global.crypto === 'undefined') {
  global.crypto = require('crypto').webcrypto;
}

// Polyfill encoders for libraries that rely on Web APIs.
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = require('util').TextDecoder as unknown as typeof TextDecoder;
}

// Stream primitives for undici/fetch in Vitest.
if (typeof global.ReadableStream === 'undefined') {
  const { ReadableStream, WritableStream } = require('node:stream/web');
  global.ReadableStream = ReadableStream;
  global.WritableStream = WritableStream;
}

// Provide minimal Fetch API globals for route handler tests.
if (typeof global.Request === 'undefined') {
  const { Request, Response, Headers } = require('undici');
  global.Request = Request;
  global.Response = Response;
  global.Headers = Headers;
}
