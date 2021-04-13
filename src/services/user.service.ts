import { FastifyRequest, FastifyReply } from 'fastify'

class UserService {
  async index (request: FastifyRequest, reply: FastifyReply) {
    return reply.send({ msg: 'Hello World' })
  }
}

export default new UserService()
