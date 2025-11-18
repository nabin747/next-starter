'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  apiClient,
  normalizeApiError,
  type ApiRequestConfig,
  type NormalizedError,
} from '@/services/api';

type UseApiOptions<TData, TBody> = {
  request?: ApiRequestConfig<TBody>;
  executeOnMount?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: NormalizedError) => void;
};

type UseApiReturn<TData, TBody> = {
  data: TData | null;
  loading: boolean;
  error: NormalizedError | null;
  execute: (overrideRequest?: Partial<ApiRequestConfig<TBody>>) => Promise<TData | null>;
  reset: () => void;
};

export function useApi<TData = unknown, TBody = unknown>(
  options: UseApiOptions<TData, TBody> = {},
): UseApiReturn<TData, TBody> {
  const { request, executeOnMount = false, onSuccess, onError } = options;
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<NormalizedError | null>(null);
  const mounted = useRef(true);

  const baseRequest = useMemo(() => request, [request]);

  const execute = useCallback(
    async (overrideRequest?: Partial<ApiRequestConfig<TBody>>) => {
      setLoading(true);
      setError(null);
      try {
        const mergedRequest = { ...baseRequest, ...overrideRequest } as ApiRequestConfig<TBody>;
        if (!mergedRequest || !mergedRequest.path) {
          throw new Error('Request configuration requires a path.');
        }
        const response = await apiClient.request<TData, TBody>(mergedRequest);
        if (!mounted.current) return null;
        setData(response.data);
        onSuccess?.(response.data);
        return response.data;
      } catch (err) {
        const normalized = normalizeApiError(err);
        if (!mounted.current) return null;
        setError(normalized);
        onError?.(normalized);
        return null;
      } finally {
        if (mounted.current) {
          setLoading(false);
        }
      }
    },
    [baseRequest, onSuccess, onError],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  useEffect(() => {
    if (executeOnMount) {
      void execute();
    }
    return () => {
      mounted.current = false;
    };
  }, [executeOnMount, execute]);

  return { data, loading, error, execute, reset };
}
