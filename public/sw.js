/**
 * Service Worker for Interactive Learning Platform
 * Provides offline precaching, background sync, and fallback shell caching.
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

// Install Event: Precache core application shell routes
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((err) => {
        // Precache error logging without throwing unhandled rejection
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
            return null;
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

  // Ignore cross-origin non-HTTP/HTTPS or extension requests
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
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // Attempt exact match from cache
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }

          // Fallback to cached home page or offline fallback page
          const offlineFallback = await caches.match('/offline.html');
          if (offlineFallback) {
            return offlineFallback;
          }

          const cachedHome = await caches.match('/');
          if (cachedHome) {
            return cachedHome;
          }

          return new Response(
            '<!DOCTYPE html><html><body><h1>Offline</h1><p>Interactive Learning Platform is currently offline.</p></body></html>',
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

  // 2. Static Assets (Scripts, Styles, Images, Fonts, Precached Shell): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return cachedResponse;
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
