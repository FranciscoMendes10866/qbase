import { FastifyRequest, FastifyReply } from 'fastify'
import fp from 'fastify-plugin'
import boom from '@hapi/boom'

export default fp(async (app, opts) => {
  app.decorate('authGuard', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      throw boom.boomify(err)
    }
  })
})
