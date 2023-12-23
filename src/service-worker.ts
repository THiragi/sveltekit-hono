/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';

const worker = self as unknown as ServiceWorkerGlobalScope;
const CACHE = `cache-${version}`;

const ASSETS = [...build, ...files];

worker.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => cache.addAll(ASSETS))
			.then(() => {
				worker.skipWaiting();
			})
			.catch((err) => {
				console.error(err);
				throw new Error('service worker install failed');
			})
	);
});

worker.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
			})
			.then(() => worker.clients.claim())
			.catch((err) => {
				console.error(err);
				throw new Error('service worker activate failed');
			})
	);
});

worker.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	event.respondWith(
		(async function () {
			const url = new URL(event.request.url);
			const cache = await caches.open(CACHE);
			const cacheMatch = await cache.match(event.request);
			if (ASSETS.includes(url.pathname) && cacheMatch) return cacheMatch;
			try {
				const res = await fetch(event.request);
				if (res.status === 200) {
					await cache.put(event.request, res.clone());
				}
				return res;
			} catch {
				const lastCacheMatchAttempt = await cache.match(event.request);
				return (
					lastCacheMatchAttempt ||
					new Response('Something went very wrong. Try force closing and reloading the app.', {
						status: 408,
						headers: { 'Content-Type': 'text/html' }
					})
				);
			}
		})()
	);
});
