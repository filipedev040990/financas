import { CreateUserController } from '@/adapters/controllers/create-user.controller'
import { buildCreateUserUseCase } from '../usecases/create-user.factory'
import { buildGetUserByLoginUseCase } from '../usecases/get-user-by-login.factory'

export const buildCreateUserController = (): CreateUserController => {
  const getUserByLoginUseCase = buildGetUserByLoginUseCase()
  const createUserUseCase = buildCreateUserUseCase()
  return new CreateUserController(getUserByLoginUseCase, createUserUseCase)
}
