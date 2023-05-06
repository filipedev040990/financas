import { CreateUserRepositoryInterface } from '@/domain/interfaces/user-repository.interface'
import { prismaClient } from '../prisma-client'

export class UserRepository implements CreateUserRepositoryInterface {
  async save (input: CreateUserRepositoryInterface.Input): Promise<void> {
    await prismaClient.user.create({
      data: {
        id: input.id,
        name: input.name,
        password: input.password,
        createdAt: input.createdAt
      }
    })
  }
}
