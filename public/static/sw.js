'use strict';

var offlineURL = '/static/offline/index.html',
	offlineCache = [
		offlineURL
	],
	offlineCacheV = 1,
	offlineCacheName = 'offline-cache-v' + offlineCacheV;

self.addEventListener('install', function (event) {

	var promises = [];

	promises.push(
		caches.open(offlineCacheName)
			.then(function (cache) {
				return cache.addAll(offlineCache);
			}).catch(function () {
				//catching any non 200 responses
			})
	);

	event.waitUntil(Promise.all(promises));
});

self.addEventListener('fetch', function (event) {
	if (event.request.url.startsWith(self.location.origin) && !event.request.url.includes('/wp-admin') && !event.request.url.includes('/wp-login') && event.request.method === 'GET') {
		if ((event.request.mode === 'navigate' || event.request.headers.get('accept').includes('text/html'))) {
			event.respondWith(
				fetch(event.request).catch(function () {
					return caches.match(offlineURL);
				})
			);
		}
	}
});

var scriptBase = self.location.origin === 'https://inews.co.uk'
	? 'https://hulkprod.anm.co.uk'
	: 'https://hulkint.anm.co.uk';
importScripts(scriptBase + '/api/web-push-notification/v1/static/latest/mol-fe-web-push-sw/sw.js');
