import { AppError } from "./appError";
import { setToCache, getFromCache } from "./cache";

export async function rateLimit(
  key: string,
  maxAttempts: number,
  windowSeconds: number
): Promise<void> {
  const attempts = (getFromCache<number>(key) || 0) + 1;
  setToCache(key, attempts, windowSeconds);
  if (attempts > maxAttempts) {
    throw new AppError(429, "Too many attempts. Try again later.");
  }
}
