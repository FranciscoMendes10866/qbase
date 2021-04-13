import fastify from 'fastify'
import cors from 'fastify-cors'
import helmet from 'fastify-helmet'
import rateLimit from 'fastify-rate-limit'
import compress from 'fastify-compress'

import { logger } from '@utils/index'
import { RedisClient } from '@providers/index'
import { UserRouter } from '@routes/index'

const { NODE_ENV, CORS_ORIGIN } = process.env

let app

NODE_ENV !== 'TEST' ? app = fastify({ logger }) : app = fastify()

app.register(cors, { origin: CORS_ORIGIN, credentials: true })
app.register(helmet)
app.register(rateLimit, {
  max: 100,
  timeWindow: 5 * 60 * 1000,
  redis: RedisClient
})
app.register(compress)
app.register(UserRouter)

export default app
