import fastify from 'fastify'
import { organizationsRoutes } from './http/controllers/organizations/routes'

export const app = fastify()

app.register(organizationsRoutes, { prefix: '/organizations' })

app.get('/', () => {
  return 'hi'
})
