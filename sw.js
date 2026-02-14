'use strict';

// Name of the cache
const CACHE_NAME = 'offline-cache';

// Files to cache
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/offline.html',
];

// Install event - caching files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching offline files');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Fetch event - serving cached files
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Activate event - cleaning up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
