type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiRequestConfig<TBody = unknown> = {
  path: string;
  method?: HttpMethod;
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: TBody;
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  retry?: {
    attempts: number;
    delayMs?: number;
  };
  timeoutMs?: number;
};

export type ApiResponse<TData> = {
  data: TData;
  status: number;
  headers: Headers;
};

export type NormalizedError = {
  message: string;
  status?: number;
  info?: unknown;
};

const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_RETRY = { attempts: 1, delayMs: 0 };

export class ApiError extends Error {
  status?: number;
  info?: unknown;

  constructor(message: string, status?: number, info?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.info = info;
  }
}

function buildUrl(path: string, params?: ApiRequestConfig['params']) {
  const base = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || '';
  const url = new URL(path, base || 'http://localhost');

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString().replace('http://localhost', ''); // keep relative paths when base not set
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function parseResponse<TData>(response: Response): Promise<ApiResponse<TData>> {
  const contentType = response.headers.get('content-type');
  const isJSON = contentType?.includes('application/json');
  const payload = isJSON ? await response.json().catch(() => null) : await response.text();

  if (!response.ok) {
    throw new ApiError(
      isJSON ? payload?.message || payload?.error || response.statusText : response.statusText,
      response.status,
      payload,
    );
  }

  return {
    data: payload as TData,
    status: response.status,
    headers: response.headers,
  };
}

async function executeWithRetry<TData, TBody>(
  config: ApiRequestConfig<TBody>,
): Promise<ApiResponse<TData>> {
  const { retry = DEFAULT_RETRY } = config;
  let attempt = 0;
  let error: unknown;

  while (attempt < retry.attempts) {
    try {
      return await requestOnce<TData, TBody>(config);
    } catch (err) {
      error = err;
      attempt += 1;
      if (attempt >= retry.attempts) break;
      await sleep(retry.delayMs ?? 300 * attempt);
    }
  }

  throw error;
}

async function requestOnce<TData, TBody>(
  config: ApiRequestConfig<TBody>,
): Promise<ApiResponse<TData>> {
  const {
    path,
    method = 'GET',
    params,
    body,
    headers = {},
    cache,
    next,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = config;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const url = buildUrl(path, params);
  const isJsonBody = body !== undefined && body !== null && typeof body === 'object';
  const init: RequestInit = {
    method,
    headers: {
      ...(isJsonBody ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body ? (isJsonBody ? JSON.stringify(body) : (body as BodyInit)) : undefined,
    cache,
    next,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, init);
    return await parseResponse<TData>(response);
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      throw new ApiError('Request timed out', 408);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function request<TData = unknown, TBody = unknown>(config: ApiRequestConfig<TBody>) {
  return executeWithRetry<TData, TBody>(config);
}

export const apiClient = {
  request,
  get: <TData>(path: string, config: Omit<ApiRequestConfig, 'path' | 'method'> = {}) =>
    request<TData>({ path, method: 'GET', ...config }),
  post: <TData, TBody = unknown>(
    path: string,
    body?: TBody,
    config: Omit<ApiRequestConfig<TBody>, 'path' | 'method' | 'body'> = {},
  ) => request<TData, TBody>({ path, method: 'POST', body, ...config }),
  put: <TData, TBody = unknown>(
    path: string,
    body?: TBody,
    config: Omit<ApiRequestConfig<TBody>, 'path' | 'method' | 'body'> = {},
  ) => request<TData, TBody>({ path, method: 'PUT', body, ...config }),
  patch: <TData, TBody = unknown>(
    path: string,
    body?: TBody,
    config: Omit<ApiRequestConfig<TBody>, 'path' | 'method' | 'body'> = {},
  ) => request<TData, TBody>({ path, method: 'PATCH', body, ...config }),
  delete: <TData>(path: string, config: Omit<ApiRequestConfig, 'path' | 'method' | 'body'> = {}) =>
    request<TData>({ path, method: 'DELETE', ...config }),
};

export function normalizeApiError(error: unknown): NormalizedError {
  if (error instanceof ApiError) {
    return {
      message: error.message,
      status: error.status,
      info: error.info,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: 'Unexpected error occurred' };
}
