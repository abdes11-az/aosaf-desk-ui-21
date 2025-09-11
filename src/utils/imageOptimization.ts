// تحسين الصور للأداء الأفضل
export class ImageOptimizer {
  private static instance: ImageOptimizer;
  private cache = new Map<string, string>();

  static getInstance(): ImageOptimizer {
    if (!ImageOptimizer.instance) {
      ImageOptimizer.instance = new ImageOptimizer();
    }
    return ImageOptimizer.instance;
  }

  // تحسين الصور بتقليل الحجم
  optimizeImage(file: File, options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  } = {}): Promise<Blob> {
    const {
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 0.8,
      format = 'webp'
    } = options;

    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;

        // حساب الأبعاد الجديدة
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        if (ratio < 1) {
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;

        // رسم الصورة المحسنة
        ctx.drawImage(img, 0, 0, width, height);
        
        // تحويل لتنسيق محسن
        canvas.toBlob(resolve, `image/${format}`, quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  // تحميل تدريجي للصور
  lazyLoadImages(): void {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }

  // ضغط الصور قبل الرفع
  compressForUpload(file: File): Promise<File> {
    return new Promise(async (resolve) => {
      if (file.size < 500000) { // أقل من 500KB
        resolve(file);
        return;
      }

      const compressedBlob = await this.optimizeImage(file, {
        maxWidth: 1024,
        maxHeight: 768,
        quality: 0.7,
        format: 'webp'
      });

      const compressedFile = new File([compressedBlob], file.name, {
        type: 'image/webp',
        lastModified: Date.now()
      });

      resolve(compressedFile);
    });
  }
}