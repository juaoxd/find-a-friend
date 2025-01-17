import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { hash } from 'bcrypt'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let organizationsRepository: OrganizationsRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationsRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationsRepository.create({
      responsible_name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
      address: 'Rua Um, 2, Sao Paulo - SP',
      whatsapp: '(11) 9 9999-9999',
    })

    const { organization } = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    await organizationsRepository.create({
      responsible_name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
      address: 'Rua Um, 2, Sao Paulo - SP',
      whatsapp: '(11) 9 9999-9999',
    })

    await expect(() =>
      sut.execute({ email: 'johndoe@email.com', password: 'wrongpassword' }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
