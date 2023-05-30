import { CreateUserController } from '@/adapters/controllers/users/create-user.controller'
import { buildCreateUserUseCase } from '../usecases/create-user.factory'
import { buildGetUserByLoginUseCase } from '../usecases/get-user-by-login.factory'
import { buildLogControllerDecorator } from './log-decorator.factory'
import { ControllerInterface } from '@/application/interfaces/controller.interface'

export const buildCreateUserController = (): ControllerInterface => {
  const getUserByLoginUseCase = buildGetUserByLoginUseCase()
  const createUserUseCase = buildCreateUserUseCase()
  const controller = new CreateUserController(getUserByLoginUseCase, createUserUseCase)
  return buildLogControllerDecorator(controller)
}
