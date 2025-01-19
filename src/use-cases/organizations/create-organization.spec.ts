import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'

let organizationsRepository: OrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create organization use case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create a new organization', async () => {
    const { organization } = await sut.execute({
      responsibleName: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      cep: '13600-170',
      city: 'Araras',
      state: 'Sao Paulo',
      street: 'Rua Barao de Arary, 721',
      neighborhood: 'Centro',
      whatsapp: '(19) 9 9999-9999',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to create a organization with same email', async () => {
    const email = 'johndoe@email.com'

    await sut.execute({
      responsibleName: 'John Doe',
      email,
      password: '123456',
      cep: '13600-170',
      city: 'Araras',
      state: 'Sao Paulo',
      street: 'Rua Barao de Arary, 721',
      neighborhood: 'Centro',
      whatsapp: '(19) 9 9999-9999',
    })

    await expect(() =>
      sut.execute({
        responsibleName: 'John Doe 2',
        email,
        password: '12345678',
        cep: '13600-170',
        city: 'Araras',
        state: 'Sao Paulo',
        street: 'Rua Barao de Arary, 721',
        neighborhood: 'Centro',
        whatsapp: '(19) 9 7070-7070',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
