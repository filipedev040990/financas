import { CreateUserController } from '@/adapters/controllers/create-user.controller'
import { buildCreateUserUseCase } from '../usecases/create-user.factory'

export const buildCreateUserController = (): CreateUserController => {
  const createUserUseCase = buildCreateUserUseCase()
  return new CreateUserController(createUserUseCase)
}
