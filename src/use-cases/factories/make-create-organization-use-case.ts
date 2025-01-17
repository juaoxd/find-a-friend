import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { CreateOrganizationUseCase } from '../organizations/create-organization'

export function makeCreateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const createOrganizationUseCase = new CreateOrganizationUseCase(
    organizationsRepository,
  )

  return createOrganizationUseCase
}
