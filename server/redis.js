import * as redis from "redis";
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,

  legacyMode: true,
}); // legacy 모드 반드시 설정 !!
redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)

module.exports = redisClient;
