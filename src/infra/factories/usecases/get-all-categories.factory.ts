import { GetAllCategoriesUseCase } from '@/application/usecases/categories/get-all-categories.usecase'
import { CategoryRepository } from '@/infra/database/repositories/category.repository'

export const buildGetAllCategoriesUseCase = (): GetAllCategoriesUseCase => {
  const categoryRepository = new CategoryRepository()
  return new GetAllCategoriesUseCase(categoryRepository)
}
