import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { buildLogControllerDecorator } from './log-decorator.factory'
import { GetAllCategoriesController } from '@/adapters/controllers/categories/get-all-categories.controller'
import { buildGetAllCategoriesUseCase } from '../usecases/get-all-categories.factory'

export const buildGetAllCategoriesController = (): ControllerInterface => {
  const getAllCategoriesUseCase = buildGetAllCategoriesUseCase()
  const controller = new GetAllCategoriesController(getAllCategoriesUseCase)
  return buildLogControllerDecorator(controller)
}
