import { FastifyRequest, FastifyReply } from 'fastify'
import { Prometheus } from '@providers/prom.provider'

const MetricsService = async (app, opts) => {
  app.get('/metrics', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.header('Content-Type', Prometheus.register.contentType)
    reply.raw.end(await Prometheus.register.metrics())
    reply.sent = true
  })
}

export default MetricsService
