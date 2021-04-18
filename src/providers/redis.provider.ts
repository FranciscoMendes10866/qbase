import Redis from 'ioredis'

const { NODE_ENV } = process.env

let host
NODE_ENV === 'PROD' ? host = 'redis' : host = 'localhost'

const RedisClient = new Redis({
  port: 6379,
  host: host
})

export default RedisClient
