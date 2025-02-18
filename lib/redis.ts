import Redis from "ioredis";

let cachedRedis: Redis;

export default function useRedis() {
  cachedRedis ??= new Redis(useRuntimeConfig().redisUrl);
  return cachedRedis;
}
