import { CreateCategoryUseCase } from '@/application/usecases/categories/create-category.usecase'
import { UUIDAdapter } from '@/infra/adapters/uuid.adapter'
import { CategoryRepository } from '@/infra/database/repositories/category.repository'

export const buildCreateCategoryUseCase = (): CreateCategoryUseCase => {
  const uuidGenerator = new UUIDAdapter()
  const categoryRepository = new CategoryRepository()
  return new CreateCategoryUseCase(uuidGenerator, categoryRepository)
}
