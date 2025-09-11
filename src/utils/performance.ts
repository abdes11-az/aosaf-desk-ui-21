// تحسينات الأداء
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// تحسين استخدام الذاكرة
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    
    // تنظيف الذاكرة إذا أصبحت كبيرة
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    cache.set(key, result);
    return result;
  }) as T;
};

// مراقبة الأداء
export const performanceMonitor = {
  startTime: 0,
  
  start(label: string) {
    this.startTime = performance.now();
    console.log(`⏱️ بدء ${label}`);
  },
  
  end(label: string) {
    const endTime = performance.now();
    const duration = endTime - this.startTime;
    console.log(`✅ انتهى ${label} في ${duration.toFixed(2)}ms`);
  }
};