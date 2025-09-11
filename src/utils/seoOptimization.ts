// تحسينات محركات البحث (SEO)
export class SEOManager {
  private static instance: SEOManager;

  static getInstance(): SEOManager {
    if (!SEOManager.instance) {
      SEOManager.instance = new SEOManager();
    }
    return SEOManager.instance;
  }

  // تحديث عنوان الصفحة
  updateTitle(title: string, suffix: string = 'أوصاف') {
    document.title = `${title} | ${suffix}`;
  }

  // تحديث وصف الصفحة
  updateDescription(description: string) {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }

  // إضافة الكلمات المفتاحية
  updateKeywords(keywords: string[]) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords.join(', '));
  }

  // إضافة Open Graph tags
  updateOpenGraph(data: {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: string;
  }) {
    const ogTags = [
      { property: 'og:title', content: data.title },
      { property: 'og:description', content: data.description },
      { property: 'og:type', content: data.type || 'website' },
      { property: 'og:url', content: data.url || window.location.href },
    ];

    if (data.image) {
      ogTags.push({ property: 'og:image', content: data.image });
    }

    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
  }

  // إضافة Twitter Card tags
  updateTwitterCard(data: {
    title: string;
    description: string;
    image?: string;
    card?: string;
  }) {
    const twitterTags = [
      { name: 'twitter:card', content: data.card || 'summary_large_image' },
      { name: 'twitter:title', content: data.title },
      { name: 'twitter:description', content: data.description },
    ];

    if (data.image) {
      twitterTags.push({ name: 'twitter:image', content: data.image });
    }

    twitterTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', tag.name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
  }

  // إضافة JSON-LD structured data
  addStructuredData(data: any) {
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  // تحسين للصفحة الرئيسية
  optimizeHomePage() {
    this.updateTitle('إنشاء أوصاف احترافية للمنتجات والعقارات');
    this.updateDescription('إنشئ أوصافاً احترافية للسيارات والهواتف والعقارات والدراجات والملابس بطريقة سهلة وسريعة. أداة مجانية لكتابة أوصاف تسويقية مميزة.');
    this.updateKeywords(['أوصاف', 'إعلانات', 'سيارات', 'عقارات', 'هواتف', 'تسويق', 'مبيعات']);

    this.updateOpenGraph({
      title: 'إنشاء أوصاف احترافية للمنتجات',
      description: 'إنشئ أوصافاً احترافية للسيارات والهواتف والعقارات بطريقة سهلة وسريعة',
    });

    this.addStructuredData({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "أوصاف",
      "description": "تطبيق لإنشاء أوصاف احترافية للمنتجات والعقارات",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SAR"
      }
    });
  }

  // تحسين صفحة فئة محددة
  optimizeCategoryPage(category: string) {
    const categoryNames: { [key: string]: string } = {
      'cars': 'السيارات',
      'real-estate': 'العقارات',
      'phones': 'الهواتف',
      'clothing': 'الملابس',
      'bicycle': 'الدراجات',
      'motorcycle': 'الدراجات النارية',
      'tablet': 'الأجهزة اللوحية'
    };

    const categoryName = categoryNames[category] || category;
    
    this.updateTitle(`إنشاء وصف ${categoryName}`);
    this.updateDescription(`إنشئ وصفاً احترافياً ومميزاً لـ${categoryName} بطريقة سهلة وسريعة. أداة مجانية لكتابة أوصاف تسويقية فعالة.`);
    this.updateKeywords(['وصف', categoryName, 'إعلان', 'بيع', 'تسويق']);

    this.updateOpenGraph({
      title: `إنشاء وصف ${categoryName}`,
      description: `إنشئ وصفاً احترافياً لـ${categoryName} بطريقة سهلة وسريعة`,
    });
  }

  // إضافة canonical URL
  addCanonicalUrl(url?: string) {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url || window.location.href);
  }

  // تحسين للسرعة
  optimizeForSpeed() {
    // إضافة preconnect للخطوط
    const preconnectLinks = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    preconnectLinks.forEach(href => {
      let link = document.querySelector(`link[href="${href}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'preconnect');
        link.setAttribute('href', href);
        document.head.appendChild(link);
      }
    });

    // إضافة dns-prefetch
    const dnsPrefetchLinks = [
      'https://cdnjs.cloudflare.com'
    ];

    dnsPrefetchLinks.forEach(href => {
      let link = document.querySelector(`link[href="${href}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'dns-prefetch');
        link.setAttribute('href', href);
        document.head.appendChild(link);
      }
    });
  }
}