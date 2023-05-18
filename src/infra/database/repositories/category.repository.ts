import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/get-category-by-id-repository.interface'
import { prismaClient } from '../prisma-client'

export class CategoryRepository implements GetCategoryByIdRepositoryInterface {
  async getById (id: string): Promise<GetCategoryByIdRepositoryInterface.Output> {
    return await prismaClient.category.findFirst({ where: { id } })
  }
}
