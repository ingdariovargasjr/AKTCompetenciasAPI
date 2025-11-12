// Service Worker para PWA
const CACHE_NAME = 'wkf-scoring-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/kata.html',
    '/kumite.html',
    '/resultados.html',
    '/admin.html',
    '/css/styles.css',
    '/js/config.js',
    '/js/theme.js',
    '/js/app.js',
    '/manifest.json'
];

// Instalación - cachear recursos
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('Error caching:', error);
            })
    );
    self.skipWaiting();
});

// Activación - limpiar caches viejos
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch - estrategia Network First con Cache Fallback
self.addEventListener('fetch', (event) => {
    // Solo cachear solicitudes HTTP/HTTPS
    if (!event.request.url.startsWith('http')) {
        return;
    }
    
    // Para APIs de Supabase, siempre usar network
    if (event.request.url.includes('supabase.co')) {
        event.respondWith(fetch(event.request));
        return;
    }
    
    // Para recursos estáticos, cache first
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - devolver respuesta
                if (response) {
                    return response;
                }
                
                // No está en cache - hacer fetch
                return fetch(event.request)
                    .then((response) => {
                        // Verificar que sea una respuesta válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clonar respuesta
                        const responseToCache = response.clone();
                        
                        // Cachear para futuras solicitudes
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Network error - devolver página offline si existe
                        return caches.match('/index.html');
                    });
            })
    );
});

// Mensajes desde la aplicación
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
