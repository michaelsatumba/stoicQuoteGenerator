// This event triggers when the service worker is installed.
self.addEventListener('install', (event) => {
  // Wait for the following promise to resolve before installing the service worker.
  event.waitUntil(
    // Open or create a cache named 'my-cache'.
    caches.open('my-cache').then((cache) => {
      // Add multiple files to the cache.
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
      ]);
    })
  );
});

// This event triggers for every network request made by the app.
self.addEventListener('fetch', (event) => {
  // Respond to the network request.
  event.respondWith(
    // Check if the requested file is in the cache.
    caches.match(event.request).then((response) => {
      // Return cached file if found, otherwise fetch from the network.
      return response || fetch(event.request);
    })
  );
});
