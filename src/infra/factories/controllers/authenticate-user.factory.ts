import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { buildLogControllerDecorator } from './log-decorator.factory'
import { AuthenticateUserController } from '@/adapters/controllers/users/authenticate-user.controller'
import { buildAuthenticateUserUseCase } from '../usecases/authenticate-user.factory'

export const buildAuthenticateUserController = (): ControllerInterface => {
  const authenticateUserUseCase = buildAuthenticateUserUseCase()
  const controller = new AuthenticateUserController(authenticateUserUseCase)
  return buildLogControllerDecorator(controller)
}
