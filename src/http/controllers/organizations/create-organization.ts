import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOrganizationBodySchema = z.object({
    responsibleName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string(),
    city: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    state: z.string(),
    whatsapp: z.string(),
  })

  const {
    responsibleName,
    email,
    password,
    cep,
    city,
    street,
    neighborhood,
    state,
    whatsapp,
  } = createOrganizationBodySchema.parse(request.body)

  try {
    const createOrganizationUseCase = makeCreateOrganizationUseCase()

    await createOrganizationUseCase.execute({
      responsibleName,
      email,
      password,
      cep,
      city,
      street,
      neighborhood,
      state,
      whatsapp,
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
