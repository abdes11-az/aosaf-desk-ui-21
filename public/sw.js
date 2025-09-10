// Service Worker لدعم العمل بدون انترنت
const CACHE_NAME = 'ausaf-app-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/lovable-uploads/99683814-2513-420d-b37f-2b72567ede76.png',
  '/locales/ar.json',
  '/locales/eg.json',
  '/locales/gulf.json',
  '/locales/ma.json',
];

// تثبيت Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 تثبيت Service Worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 تخزين الملفات في الكاش');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// تفعيل Service Worker
self.addEventListener('activate', (event) => {
  console.log('✅ تفعيل Service Worker');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ حذف كاش قديم:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
      })
  );
});

// استراتيجية الكاش مع تحديث تلقائي للمحتوى
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // تجاهل الطلبات غير HTTP/HTTPS
  if (!req.url.startsWith('http')) return;

  // صفحات HTML والتنقل => شبكة أولاً مع رجوع للكاش إن لزم
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        // خزّن نسخة للاستخدام دون إنترنت
        const cache = await caches.open(CACHE_NAME);
        cache.put('/index.html', fresh.clone());
        return fresh;
      } catch (e) {
        return (await caches.match('/index.html')) || (await caches.match('/'));
      }
    })());
    return;
  }

  // ملفات الترجمة => شبكة أولاً لضمان أحدث النصوص
  if (new URL(req.url).pathname.startsWith('/locales/')) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        return caches.match(req);
      }
    })());
    return;
  }

  // باقي الأصول => stale-while-revalidate
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);

    const fetchPromise = fetch(req)
      .then((networkRes) => {
        if (networkRes && networkRes.status === 200 && networkRes.type === 'basic') {
          cache.put(req, networkRes.clone());
        }
        return networkRes;
      })
      .catch(() => undefined);

    return cached || (await fetchPromise);
  })());
});

// رسائل للتطبيق
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// إشعار عند تحديث الكاش
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 مزامنة البيانات في الخلفية');
  }
});