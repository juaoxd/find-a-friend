import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcrypt'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'

interface CreateOrganizationUseCaseRequest {
  responsibleName: string
  email: string
  password: string
  address: string
  whatsapp: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  public constructor(
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    responsibleName,
    email,
    password,
    address,
    whatsapp,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      responsible_name: responsibleName,
      email,
      password_hash,
      address,
      whatsapp,
    })

    return { organization }
  }
}
