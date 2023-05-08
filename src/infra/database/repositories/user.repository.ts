import { CreateUserRepositoryInterface, GetUserByLoginRepositoryInterface } from '@/domain/interfaces/user-repository.interface'
import { prismaClient } from '../prisma-client'

export class UserRepository implements CreateUserRepositoryInterface, GetUserByLoginRepositoryInterface {
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
}
