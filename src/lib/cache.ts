// lib/cache.ts
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function getFromCache<T>(key: string): Promise<T | null> {
  return await redis.get<T>(key);
}

export async function setToCache<T>(key: string, value: T, ttlSeconds?: number): Promise<boolean> {
  const exists = await redis.get(key);
  if (exists) return false;

  if (ttlSeconds) {
    await redis.set(key, value, { ex: ttlSeconds });
  } else {
    await redis.set(key, value);
  }

  return true;
}

export async function deleteFromCache(key: string): Promise<void> {
  await redis.del(key);
}

export async function clearCache(): Promise<void> {
  await redis.flushall(); // WARNING: Clears entire cache
}
