import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/get-category-by-id-repository.interface'
import { prismaClient } from '../prisma-client'
import { CreateCategoryRepositoryInterface } from '@/domain/interfaces/create-category-repository.interface'

export class CategoryRepository implements GetCategoryByIdRepositoryInterface, CreateCategoryRepositoryInterface {
  async getById (id: string): Promise<GetCategoryByIdRepositoryInterface.Output> {
    return await prismaClient.category.findFirst({ where: { id } })
  }

  async create (input: CreateCategoryRepositoryInterface.Input): Promise<void> {
    await prismaClient.category.create({
      data: {
        id: input.id,
        name: input.name,
        created_at: input.created_at
      }
    })
  }
}
