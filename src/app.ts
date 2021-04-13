import fastify from 'fastify'
import cors from 'fastify-cors'
import helmet from 'fastify-helmet'
import rateLimit from 'fastify-rate-limit'
import jwt from 'fastify-jwt'
import compress from 'fastify-compress'

import { logger } from '@utils/index'
import { RedisClient } from '@providers/index'
import { AuthGuard } from '@middlewares/index'
import { UserService } from '@services/index'

const { NODE_ENV, CORS_ORIGIN, JWT_SECRET } = process.env

let app

NODE_ENV !== 'TEST' ? app = fastify({ logger }) : app = fastify()

app.register(cors, { origin: CORS_ORIGIN })
app.register(helmet)
app.register(rateLimit, {
  max: 100,
  timeWindow: 5 * 60 * 1000,
  redis: RedisClient
})
app.register(jwt, { secret: JWT_SECRET })
app.register(AuthGuard)
app.register(compress)
app.register(UserService)

export default app
