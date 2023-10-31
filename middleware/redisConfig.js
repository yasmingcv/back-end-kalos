// const { Redis } = require("ioredis")
// const { promisify } = require("util")


// const redisClient = new Redis()

// function getRedis(value){
//     const syncRedisGet = promisify(redisClient.get).bind(redisClient);
//     return syncRedisGet(value.toString())
// }

// function setRedis(key, value){
//     const syncRedisSet = promisify(redisClient.set).bind(redisClient);
//     return syncRedisSet(key, value.toString())
// }
// module.exports = {
//     getRedis,
//     setRedis,
//     redisClient
// }