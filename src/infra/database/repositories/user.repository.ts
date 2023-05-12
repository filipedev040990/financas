import { CreateUserRepositoryInterface, GetUserByIdRepositoryInterface, GetUserByLoginRepositoryInterface, UpdateUserRepositoryInterface } from '@/domain/interfaces/user-repository.interface'
import { prismaClient } from '../prisma-client'

export class UserRepository implements CreateUserRepositoryInterface, GetUserByLoginRepositoryInterface, GetUserByIdRepositoryInterface, UpdateUserRepositoryInterface {
  async save (input: CreateUserRepositoryInterface.Input): Promise<void> {
    await prismaClient.user.create({
      data: {
        id: input.id,
        name: input.name,
        login: input.login,
        password: input.password,
        accessToken: input.accessToken,
        createdAt: input.createdAt
      }
    })
  }

  async getByLogin (login: string): Promise<GetUserByLoginRepositoryInterface.Output> {
    return await prismaClient.user.findFirst({ where: { login } })
  }

  async getById (id: string): Promise<GetUserByIdRepositoryInterface.Output> {
    return await prismaClient.user.findUnique({ where: { id } })
  }

  async update (input: UpdateUserRepositoryInterface.Input): Promise<void> {
    await prismaClient.user.update({
      data: {
        name: input.name,
        updatedAt: input.updatedAt
      },
      where: { id: input.id }
    })
  }
}
