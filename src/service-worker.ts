/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
} from "workbox-strategies";
import { BackgroundSyncPlugin } from "workbox-background-sync";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Cache version and files to cache
const CACHE_NAME = "cache_sample";
const urlsToCache = ["index.html", "offline.html", "manifest.json"];
const version = "v1.2.0";

// Precache all of the assets generated by your build process.
precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
  ({ request, url }: { request: Request; url: URL }) => {
    if (request.mode !== "navigate") return false;
    if (url.pathname.startsWith("/_")) return false;
    if (url.pathname.match(fileExtensionRegexp)) return false;
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"),
);

registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"),
  new CacheFirst({
    cacheName: "images",
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  }),
);

// Cache CSS and JavaScript files with a stale-while-revalidate strategy
registerRoute(
  ({ request }) =>
    request.destination === "style" || request.destination === "script",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
  }),
);

// Cache API responses with a network-first strategy
registerRoute(
  ({ url }) => url.pathname.startsWith("/api/"),
  new NetworkFirst({
    cacheName: "api-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // Cache for 5 minutes
      }),
      new BackgroundSyncPlugin("api-sync-queue", {
        maxRetentionTime: 24 * 60, // Retry for up to 24 hours
      }),
    ],
  }),
);

// Fallback to offline page
const FALLBACK_URL = "offline.html";
self.addEventListener("install", (event) => {
  console.log("sw install event");
  event.waitUntil(
    caches.open(version + CACHE_NAME).then((cache) => {
      console.log("opened cache");
      return cache.addAll(urlsToCache);
    }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("sw activate event");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.indexOf(version) !== 0)
            .map((cacheName) => caches.delete(cacheName)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(
        () => caches.match(FALLBACK_URL) as Promise<Response>,
      ),
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }) as Promise<Response>,
    );
  }
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("controllerchange", () => {
  window.location.reload();
});

// Background sync for failed requests
self.addEventListener("sync", (event) => {
  if (event.tag === "api-sync-queue") {
    event.waitUntil(syncFailedRequests());
  }
});

async function syncFailedRequests() {
  const cache = await caches.open("api-cache");
  const requests = await cache.keys();
  await Promise.all(
    requests.map(async (request) => {
      try {
        const response = await fetch(request);
        await cache.put(request, response);
      } catch (error) {
        console.error("Failed to sync request:", request, error);
      }
    }),
  );
}
