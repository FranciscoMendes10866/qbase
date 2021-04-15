import { FastifyRequest, FastifyReply } from 'fastify'

import { counter, histogram, metricInit, metricEnd } from '@providers/prom.provider'

const UserService = async (app, opts) => {
  app.get('/api/signup', async (request: FastifyRequest, reply: FastifyReply) => {
    const token = app.jwt.sign({ id: 1 })
    return reply.send({ token })
  })

  app.get('/api', { preValidation: [app.authGuard] }, async (request: FastifyRequest, reply: FastifyReply) => {
    counter.inc()
    const init = metricInit()

    const user = request.user

    histogram.observe(metricEnd(init))
    return reply.send({ user })
  })
}

export default UserService
