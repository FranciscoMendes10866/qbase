import fastify from 'fastify'
import cors from 'fastify-cors'
import helmet from 'fastify-helmet'
import redis from 'fastify-redis'
import rateLimit from 'fastify-rate-limit'
import jwt from 'fastify-jwt'
import compress from 'fastify-compress'

import { logger } from '@utils/index'
import { AuthGuard } from '@middlewares/index'
import { RedisClient } from '@providers/index'
import { MetricsController, UserController } from '@controllers/index'

const { NODE_ENV, CORS_ORIGIN, JWT_SECRET } = process.env

let app

NODE_ENV !== 'TESTING' ? app = fastify({ logger }) : app = fastify()

app.register(cors, { origin: CORS_ORIGIN })
app.register(helmet)
app.register(redis, { client: RedisClient, closeClient: true })
app.register(rateLimit, {
  max: 100,
  timeWindow: 5 * 60 * 1000,
  redis: RedisClient
})
app.register(jwt, { secret: JWT_SECRET })
app.register(AuthGuard)
app.register(compress)
app.register(MetricsController)
app.register(UserController)

export default app
