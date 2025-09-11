import { useState, useRef, useEffect, memo } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
}

const LazyImage = memo(({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  loading = 'lazy',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI2Y4ZjlmYSIvPgogIDx0ZXh0IHg9IjE2MCIgeT0iOTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2Yzc1N2QiPkxvYWRpbmcuLi48L3RleHQ+Cjwvc3ZnPg=='
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            if (image.dataset.src) {
              image.src = image.dataset.src;
              observer.unobserve(image);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(img);

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          className
        )}
        style={{ width, height }}
      >
        <span className="text-sm">فشل في تحميل الصورة</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      data-src={src}
      src={placeholder}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={cn(
        "transition-opacity duration-300",
        isLoaded ? "opacity-100" : "opacity-50",
        className
      )}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;