/**
 * Service Worker for Interactive Learning Platform
 * Provides offline precaching, robust fallback shell caching, and cache lifecycle management.
 */

const CACHE_NAME = 'interactive-lab-v1';

const PRECACHE_ASSETS = [
  '/',
  '/math',
  '/physics',
  '/chemistry',
  '/biology',
  '/cs',
  '/thai',
  '/practice',
  '/manifest.webmanifest',
  '/manifest.json',
  '/offline.html',
  '/favicon.ico',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
  '/icons/icon-maskable.svg',
];

// Install Event: Precache core application shell routes with per-item resilience
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(async (cache) => {
        // Use resilient batch caching so one network blip does not abort all shell precaching
        const results = await Promise.allSettled(
          PRECACHE_ASSETS.map((asset) => cache.add(asset))
        );
        const failed = results.filter((r) => r.status === 'rejected');
        if (failed.length > 0) {
          console.warn('[ServiceWorker] Some precache assets failed to download:', failed.length);
        }
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((err) => {
        console.warn('[ServiceWorker] Precache failed:', err);
      })
  );
});

// Activate Event: Clean up outdated cache versions and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
            return Promise.resolve();
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch Event: Intelligent routing between network and cache
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle HTTP/HTTPS GET requests
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Ignore non-HTTP/HTTPS protocols (e.g. chrome-extension://, file://)
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // 1. Navigation Requests (HTML pages): Network-First with Cache fallback and Offline Page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone).catch(() => {});
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // 1. Attempt exact match from cache
          let cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }

          // 2. Attempt match ignoring search/query parameters (e.g. /physics?preset=pendulum)
          cachedResponse = await caches.match(request, { ignoreSearch: true });
          if (cachedResponse) {
            return cachedResponse;
          }

          // 3. Normalize trailing slashes (e.g. /physics/ -> /physics)
          if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
            const cleanPath = url.pathname.slice(0, -1);
            cachedResponse = await caches.match(cleanPath);
            if (cachedResponse) {
              return cachedResponse;
            }
          }

          // 4. Fallback to cached dedicated offline page
          const offlineFallback = await caches.match('/offline.html');
          if (offlineFallback) {
            return offlineFallback;
          }

          // 5. Fallback to cached home page shell
          const cachedHome = await caches.match('/');
          if (cachedHome) {
            return cachedHome;
          }

          // 6. Final emergency HTML response (Never return undefined to respondWith)
          return new Response(
            '<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><title>ออฟไลน์</title></head><body style="background:#070b16;color:#f8fafc;font-family:sans-serif;padding:2rem;text-align:center;"><h1>โหมดออฟไลน์</h1><p>ระบบอยู่ในโหมดออฟไลน์และไม่พบหน้าที่ระบุในแคช</p></body></html>',
            {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'text/html; charset=utf-8' },
            }
          );
        })
    );
    return;
  }

  // 2. Static Assets (Scripts, Styles, Images, Fonts): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone).catch(() => {});
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Never resolve to undefined: return cached response or safe 503 fallback
          return (
            cachedResponse ||
            new Response('Asset not available offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            })
          );
        });

      return cachedResponse || fetchPromise;
    })
  );
});

// Message Event: Allow manual skipWaiting trigger from client updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
