import { UpdateUserController } from '@/adapters/controllers/users/update-user.controller'
import { buildGetUserById } from '../usecases/get-user-by-id.factory'
import { buildUpdateUser } from '../usecases/update-user.factory'

export const buildUpdateUserController = (): UpdateUserController => {
  const getUserUseCase = buildGetUserById()
  const updateUserUseCase = buildUpdateUser()
  return new UpdateUserController(getUserUseCase, updateUserUseCase)
}
