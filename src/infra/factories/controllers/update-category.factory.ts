import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { buildLogControllerDecorator } from './log-decorator.factory'
import { UpdateCategoryController } from '@/adapters/controllers/categories/update-category.controller'
import { buildUpdateCategoryUseCase } from '../usecases/update-category.factory'
import { buildGetCategoryByIdUseCase } from '../usecases/get-category-by-id.factory'

export const buildUpdateCategoryController = (): ControllerInterface => {
  const updateCategoryUseCase = buildUpdateCategoryUseCase()
  const getCategoryByIdUseCase = buildGetCategoryByIdUseCase()
  const controller = new UpdateCategoryController(updateCategoryUseCase, getCategoryByIdUseCase)
  return buildLogControllerDecorator(controller)
}
