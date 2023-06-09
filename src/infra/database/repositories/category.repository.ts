import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/get-category-by-id-repository.interface'
import { prismaClient } from '../prisma-client'
import { CreateCategoryRepositoryInterface } from '@/domain/interfaces/create-category-repository.interface'
import { UpdateCategoryRepositoryInterface } from '@/domain/interfaces/update-category-repository.interface'
import { GetAllCategoriesRepositoryInterface } from '@/domain/interfaces/get-all-categories-repository'

export class CategoryRepository implements GetCategoryByIdRepositoryInterface, CreateCategoryRepositoryInterface, UpdateCategoryRepositoryInterface, GetAllCategoriesRepositoryInterface {
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

  async update (input: UpdateCategoryRepositoryInterface.Input): Promise<void> {
    await prismaClient.category.update({
      data: {
        name: input.name,
        updated_at: input.updated_at
      },
      where: {
        id: input.id
      }
    })
  }

  async getAll (): Promise<GetAllCategoriesRepositoryInterface.Output[] | null> {
    const output: GetAllCategoriesRepositoryInterface.Output[] | null = []

    const categories = await prismaClient.category.findMany()
    if (categories) {
      categories.map((categorie) => {
        output.push({
          id: categorie.id,
          name: categorie.name,
          created_at: categorie.created_at,
          updated_at: categorie.updated_at ?? undefined
        })
        return output
      })
    }

    return output.length ? output : null
  }
}
