import { FastifyRequest, FastifyReply } from 'fastify'

const UserService = async (app, opts) => {
  app.get('/api/signup', async (request: FastifyRequest, reply: FastifyReply) => {
    const token = app.jwt.sign({ id: 1 })
    return reply.send({ token })
  })

  app.get('/api', { preValidation: [app.authGuard] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user
    return reply.send({ user })
  })
}

export default UserService
