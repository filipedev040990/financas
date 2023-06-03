import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { buildLogControllerDecorator } from './log-decorator.factory'
import { GetCategoryByIdController } from '@/adapters/controllers/categories/get-category-by-id.controller'
import { buildGetCategoryByIdUseCase } from '../usecases/get-category-by-id.factory'

export const buildGetCategoryByIdController = (): ControllerInterface => {
  const getCategoryByIdUseCase = buildGetCategoryByIdUseCase()
  const controller = new GetCategoryByIdController(getCategoryByIdUseCase)
  return buildLogControllerDecorator(controller)
}
