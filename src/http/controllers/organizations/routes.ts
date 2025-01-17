import { FastifyInstance } from 'fastify'
import { createOrganization } from './create-organization'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/', createOrganization)
}
