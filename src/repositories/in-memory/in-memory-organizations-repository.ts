import { Prisma, Organization } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find((org) => org.email === email)

    return organization ?? null
  }

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = {
      id: randomUUID(),
      responsible_name: data.responsible_name,
      email: data.email,
      password_hash: data.password_hash,
      address: data.address,
      whatsapp: data.whatsapp,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }
}
