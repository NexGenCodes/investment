import NodeCache from "node-cache";

// Create a cache with a default TTL of 60 seconds (1 minutes)
const cache = new NodeCache({ stdTTL: 80, checkperiod: 120 });

export function getFromCache<T>(key: string) {
  return cache.get<T>(key);
}

export function setToCache<T>(key: string, value: T, ttl?: number) {
  // check if key exists
  if (getFromCache(key)) {
    return false;
  }
  if (ttl) cache.set(key, value, ttl);
  
  return cache.set(key, value);
}

export function deleteFromCache(key: string) {
  cache.del(key);
}

export function clearCache() {
  cache.flushAll();
}
