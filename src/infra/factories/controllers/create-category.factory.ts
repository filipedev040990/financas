import { CreateCategoryController } from '@/adapters/controllers/categories/create-category.controller'
import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { buildCreateCategoryUseCase } from '../usecases/create-category.factory'
import { buildLogControllerDecorator } from './log-decorator.factory'

export const buildCreateCategoryController = (): ControllerInterface => {
  const createCategoryUseCase = buildCreateCategoryUseCase()
  const controller = new CreateCategoryController(createCategoryUseCase)
  return buildLogControllerDecorator(controller)
}
