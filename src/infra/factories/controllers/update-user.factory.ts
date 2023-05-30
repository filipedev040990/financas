import { UpdateUserController } from '@/adapters/controllers/users/update-user.controller'
import { buildGetUserById } from '../usecases/get-user-by-id.factory'
import { buildUpdateUser } from '../usecases/update-user.factory'
import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { buildLogControllerDecorator } from './log-decorator.factory'

export const buildUpdateUserController = (): ControllerInterface => {
  const getUserUseCase = buildGetUserById()
  const updateUserUseCase = buildUpdateUser()
  const controller = new UpdateUserController(getUserUseCase, updateUserUseCase)
  return buildLogControllerDecorator(controller)
}
