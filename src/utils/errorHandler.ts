import React from 'react';

// نظام معالجة الأخطاء
export class AppError extends Error {
  constructor(
    message: string,
    public code: string = 'UNKNOWN_ERROR',
    public severity: 'low' | 'medium' | 'high' = 'medium'
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = {
  // معالجة أخطاء التخزين المحلي
  handleStorageError: (error: Error) => {
    console.error('خطأ في التخزين المحلي:', error);
    
    // محاولة تنظيف التخزين التالف
    try {
      localStorage.clear();
    } catch (clearError) {
      console.error('فشل في تنظيف التخزين:', clearError);
    }
    
    return new AppError(
      'حدث خطأ في حفظ البيانات. تم إعادة تعيين التطبيق.',
      'STORAGE_ERROR',
      'medium'
    );
  },

  // معالجة أخطاء النماذج
  handleFormError: (error: Error) => {
    console.error('خطأ في النموذج:', error);
    return new AppError(
      'حدث خطأ في معالجة النموذج. يرجى المحاولة مرة أخرى.',
      'FORM_ERROR',
      'low'
    );
  },

  // معالجة أخطاء الترجمة
  handleTranslationError: (error: Error) => {
    console.error('خطأ في الترجمة:', error);
    return new AppError(
      'حدث خطأ في تحميل الترجمة. سيتم استخدام النص الافتراضي.',
      'TRANSLATION_ERROR',
      'low'
    );
  },

  // تسجيل الأخطاء للمراقبة
  logError: (error: Error | AppError, context?: string) => {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context: context || 'unknown',
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.error('تفاصيل الخطأ:', errorInfo);
    
    // في بيئة الإنتاج، يمكن إرسال الأخطاء لخدمة المراقبة
    if (process.env.NODE_ENV === 'production') {
      // إرسال للخدمة المراقبة (مثل Sentry)
    }
  }
};

// مكون معالجة الأخطاء
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return class ErrorBoundary extends React.Component<P, { hasError: boolean }> {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      errorHandler.logError(error, 'React Error Boundary');
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="page-content text-center">
            <div className="mt-20">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-foreground mb-2">حدث خطأ</h2>
              <p className="text-muted-foreground">عذراً، حدث خطأ غير متوقع</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
              >
                إعادة تحميل الصفحة
              </button>
            </div>
          </div>
        );
      }

      return <Component {...this.props} />;
    }
  };
};