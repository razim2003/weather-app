const SHELL_CACHE = "weather-app-shell-v1";
const WEATHER_CACHE = "weather-app-weather-v1";
const SHELL_FILES = [
    "./",
    "./index.html",
    "./manifest.webmanifest",
    "./css/styles.css",
    "./js/app.js",
    "./js/api.js",
    "./js/ui.js",
    "./js/utils.js",
    "./icons/weather.svg"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(SHELL_CACHE)
            .then((cache) => cache.addAll(SHELL_FILES))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys
                    .filter((key) => key.startsWith("weather-app-")
                        && ![SHELL_CACHE, WEATHER_CACHE].includes(key))
                    .map((key) => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    const request = event.request;
    const url = new URL(request.url);

    if (request.method !== "GET" || url.origin !== self.location.origin) return;

    if (url.pathname === "/api/weather") {
        event.respondWith(fetchWeather(request));
        return;
    }

    event.respondWith(fetchShellResource(request));
});

async function fetchWeather(request) {
    const cache = await caches.open(WEATHER_CACHE);

    try {
        const response = await fetch(request);
        if (response.ok) {
            const headers = copyBodyHeaders(response.headers);
            headers.set("X-Weather-Cached-At", new Date().toISOString());
            const cachedResponse = new Response(await response.clone().arrayBuffer(), {
                status: response.status,
                statusText: response.statusText,
                headers
            });
            await cache.put(request, cachedResponse);
        }
        return response;
    } catch (error) {
        const cached = await cache.match(request);
        if (!cached) {
            return new Response(
                JSON.stringify({ error: "Weather is unavailable offline." }),
                { status: 503, headers: { "Content-Type": "application/json" } }
            );
        }

        const headers = copyBodyHeaders(cached.headers);
        headers.set("X-Weather-Offline", "true");
        return new Response(await cached.arrayBuffer(), {
            status: cached.status,
            statusText: cached.statusText,
            headers
        });
    }
}

function copyBodyHeaders(source) {
    const headers = new Headers(source);
    headers.delete("content-encoding");
    headers.delete("content-length");
    headers.delete("transfer-encoding");
    return headers;
}

async function fetchShellResource(request) {
    const cached = await caches.match(request);

    try {
        const response = await fetch(request);
        if (response.ok && response.type === "basic") {
            const cache = await caches.open(SHELL_CACHE);
            await cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        if (cached) return cached;
        if (request.mode === "navigate") {
            const appShell = await caches.match("./index.html");
            if (appShell) return appShell;
        }
        return Response.error();
    }
}
