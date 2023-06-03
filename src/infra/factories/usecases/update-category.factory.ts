import { UpdateCategoryUseCase } from '@/application/usecases/categories/update-category.usecase'
import { CategoryRepository } from '@/infra/database/repositories/category.repository'

export const buildUpdateCategoryUseCase = (): UpdateCategoryUseCase => {
  const categoryRepository = new CategoryRepository()
  return new UpdateCategoryUseCase(categoryRepository)
}
