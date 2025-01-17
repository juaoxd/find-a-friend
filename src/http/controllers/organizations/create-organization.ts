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
    address: z.string(),
    whatsapp: z.string(),
  })

  const { responsibleName, email, password, address, whatsapp } =
    createOrganizationBodySchema.parse(request.body)

  try {
    const createOrganizationUseCase = makeCreateOrganizationUseCase()

    await createOrganizationUseCase.execute({
      responsibleName,
      email,
      password,
      address,
      whatsapp,
    })
  } catch (err) {
    return reply.status(500).send(err)
  }

  return reply.status(201).send()
}
