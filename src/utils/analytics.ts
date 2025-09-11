// نظام تحليلات شامل لمراقبة الأداء والاستخدام
export class AnalyticsManager {
  private static instance: AnalyticsManager;
  private events: Array<{
    name: string;
    data: any;
    timestamp: number;
    sessionId: string;
  }> = [];
  private sessionId: string;
  private startTime: number;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.initializePerformanceMonitoring();
  }

  static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager();
    }
    return AnalyticsManager.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // تتبع الأحداث
  track(eventName: string, data: any = {}) {
    const event = {
      name: eventName,
      data: {
        ...data,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        sessionDuration: Date.now() - this.startTime
      },
      timestamp: Date.now(),
      sessionId: this.sessionId
    };

    this.events.push(event);
    
    // إرسال إلى console في التطوير
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event);
    }

    // حفظ في localStorage
    this.saveToLocalStorage();
  }

  // تتبع عرض الصفحات
  trackPageView(pageName: string) {
    this.track('page_view', {
      page: pageName,
      referrer: document.referrer
    });
  }

  // تتبع النقرات
  trackClick(element: string, context?: any) {
    this.track('click', {
      element,
      context
    });
  }

  // تتبع الأخطاء
  trackError(error: Error, context?: any) {
    this.track('error', {
      message: error.message,
      stack: error.stack,
      context
    });
  }

  // تتبع الأداء
  trackPerformance(metric: string, value: number, unit: string = 'ms') {
    this.track('performance', {
      metric,
      value,
      unit
    });
  }

  // مراقبة الأداء تلقائياً
  private initializePerformanceMonitoring() {
    // Web Vitals
    if ('PerformanceObserver' in window) {
      // Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            this.trackPerformance('LCP', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            this.trackPerformance('FID', (entry as any).processingStart - entry.startTime);
          }
          if (entry.entryType === 'layout-shift') {
            if (!(entry as any).hadRecentInput) {
              this.trackPerformance('CLS', (entry as any).value, 'score');
            }
          }
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }

    // تتبع استخدام الذاكرة
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        this.trackPerformance('memory_used', memory.usedJSHeapSize / 1048576, 'MB');
        this.trackPerformance('memory_total', memory.totalJSHeapSize / 1048576, 'MB');
      }, 30000); // كل 30 ثانية
    }

    // تتبع أخطاء JavaScript
    window.addEventListener('error', (event) => {
      this.trackError(event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // تتبع الأخطاء غير المعالجة
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError(new Error(event.reason), {
        type: 'unhandled_promise_rejection'
      });
    });
  }

  // حفظ البيانات في localStorage
  private saveToLocalStorage() {
    try {
      const existingData = localStorage.getItem('analytics_events');
      const allEvents = existingData ? JSON.parse(existingData) : [];
      
      // الاحتفاظ بآخر 1000 حدث فقط
      const updatedEvents = [...allEvents, ...this.events].slice(-1000);
      
      localStorage.setItem('analytics_events', JSON.stringify(updatedEvents));
      this.events = []; // مسح الأحداث المحفوظة
    } catch (error) {
      console.warn('فشل في حفظ بيانات التحليلات:', error);
    }
  }

  // الحصول على إحصائيات الاستخدام
  getUsageStats() {
    try {
      const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      const now = Date.now();
      const lastHour = now - (60 * 60 * 1000);
      const lastDay = now - (24 * 60 * 60 * 1000);
      const lastWeek = now - (7 * 24 * 60 * 60 * 1000);

      return {
        totalEvents: events.length,
        lastHour: events.filter((e: any) => e.timestamp > lastHour).length,
        lastDay: events.filter((e: any) => e.timestamp > lastDay).length,
        lastWeek: events.filter((e: any) => e.timestamp > lastWeek).length,
        topPages: this.getTopPages(events),
        errors: events.filter((e: any) => e.name === 'error').length,
        performance: this.getPerformanceStats(events)
      };
    } catch (error) {
      console.warn('فشل في الحصول على إحصائيات الاستخدام:', error);
      return null;
    }
  }

  private getTopPages(events: any[]) {
    const pageViews = events.filter(e => e.name === 'page_view');
    const pages: { [key: string]: number } = {};
    
    pageViews.forEach(event => {
      const page = event.data.page;
      pages[page] = (pages[page] || 0) + 1;
    });

    return Object.entries(pages)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([page, count]) => ({ page, count }));
  }

  private getPerformanceStats(events: any[]) {
    const perfEvents = events.filter(e => e.name === 'performance');
    const metrics: { [key: string]: number[] } = {};

    perfEvents.forEach(event => {
      const metric = event.data.metric;
      if (!metrics[metric]) metrics[metric] = [];
      metrics[metric].push(event.data.value);
    });

    const stats: { [key: string]: any } = {};
    Object.entries(metrics).forEach(([metric, values]) => {
      stats[metric] = {
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        count: values.length
      };
    });

    return stats;
  }
}