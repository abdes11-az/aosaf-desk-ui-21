import { useCallback, useMemo, useRef } from 'react';
import { debounce, throttle, memoize } from '@/utils/performance';

export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const debouncedFn = useRef<T>();
  
  return useMemo(() => {
    if (!debouncedFn.current) {
      debouncedFn.current = debounce(callback, delay) as T;
    }
    return debouncedFn.current;
  }, [callback, delay]);
};

export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  limit: number
): T => {
  const throttledFn = useRef<T>();
  
  return useMemo(() => {
    if (!throttledFn.current) {
      throttledFn.current = throttle(callback, limit) as T;
    }
    return throttledFn.current;
  }, [callback, limit]);
};

export const useMemoize = <T extends (...args: any[]) => any>(
  callback: T
): T => {
  const memoizedFn = useRef<T>();
  
  return useMemo(() => {
    if (!memoizedFn.current) {
      memoizedFn.current = memoize(callback) as T;
    }
    return memoizedFn.current;
  }, [callback]);
};

export const usePerformanceMonitor = () => {
  const startTime = useRef<number>(0);
  
  const start = useCallback((label: string) => {
    startTime.current = performance.now();
    console.log(`⏱️ بدء ${label}`);
  }, []);
  
  const end = useCallback((label: string) => {
    const endTime = performance.now();
    const duration = endTime - startTime.current;
    console.log(`✅ انتهى ${label} في ${duration.toFixed(2)}ms`);
  }, []);
  
  return { start, end };
};