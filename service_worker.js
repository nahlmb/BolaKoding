importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox) {
    console.log(`Workbox success loaded`);
}
else {
    console.log(`Workbox error`);
}

workbox.precaching.precacheAndRoute([
    { url: './', revision: '1' },
    { url: 'manifest.json', revision: '1' },
    { url: 'nav.html', revision: '1' },
    { url: 'index.html', revision: '1' },
    { url: 'club.html', revision: '1' },
    { url: 'js/db.js', revision: '1' },
    { url: 'js/idb.js', revision: '1' },
    { url: 'js/pageapi.js', revision: '1' },
    { url: 'js/register.js', revision: '1' },
    { url: 'js/nav.js', revision: '1' },
    { url: 'js/materialize.min.js', revision: '1' },
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp('/img/'),
    workbox.strategies.cacheFirst({
        cacheName: 'image'
    })
);

workbox.routing.registerRoute(
    new RegExp('/css/'),
    workbox.strategies.cacheFirst({
        cacheName: 'css'
    })
);

workbox.routing.registerRoute(
    new RegExp('https://fonts.googleapis.com'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

workbox.routing.registerRoute(
    new RegExp('https://fonts.gstatic.com'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-api-data',
    })
);

self.addEventListener('push', event => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: 'img/icon-512.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});