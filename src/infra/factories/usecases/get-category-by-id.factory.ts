import { GetCategoryByIdUseCase } from '@/application/usecases/categories/get-category-by-id'
import { CategoryRepository } from '@/infra/database/repositories/category.repository'

export const buildGetCategoryByIdUseCase = (): GetCategoryByIdUseCase => {
  const categoryReporitory = new CategoryRepository()
  return new GetCategoryByIdUseCase(categoryReporitory)
}
