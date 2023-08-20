import { Redis } from "ioredis";

// creating a connection
const redis = new Redis(`${process.env.REDISURL}`!)

export default redis;