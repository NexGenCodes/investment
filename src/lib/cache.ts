import NodeCache from "node-cache";

// Singleton class for cache
class CacheSingleton {
  private static instance: CacheSingleton;
  private cache: NodeCache;

  // Private constructor to prevent direct instantiation
  private constructor() {
    this.cache = new NodeCache({
      stdTTL: 120,
      checkperiod: 180,
    });
  }

  // Get the singleton instance
  public static getInstance(): CacheSingleton {
    if (!CacheSingleton.instance) {
      CacheSingleton.instance = new CacheSingleton();
    }
    return CacheSingleton.instance;
  }

  // Cache methods
  public get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  public set<T>(key: string, value: T, ttl?: number): boolean {
    if (this.get<T>(key) !== undefined) {
      return false; // Prevent overwriting existing key
    }
    return ttl ? this.cache.set(key, value, ttl) : this.cache.set(key, value);
  }

  public del(key: string): void {
    this.cache.del(key);
  }

  public flushAll(): void {
    this.cache.flushAll();
  }
}

// Export singleton instance methods
const cacheInstance = CacheSingleton.getInstance();

export function getFromCache<T>(key: string): T | undefined {
  return cacheInstance.get<T>(key);
}

export function setToCache<T>(key: string, value: T, ttl?: number): boolean {
  return cacheInstance.set<T>(key, value, ttl);
}

export function deleteFromCache(key: string): void {
  cacheInstance.del(key);
}

export function clearCache(): void {
  cacheInstance.flushAll();
}

export default cacheInstance; // Optional: export the instance for direct access
