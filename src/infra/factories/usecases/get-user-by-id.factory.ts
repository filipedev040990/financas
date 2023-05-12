import { GetUserByIdUseCase } from '@/application/usecases/users/get-user-by-id'
import { UserRepository } from '@/infra/database/repositories/user.repository'

export const buildGetUserById = (): GetUserByIdUseCase => {
  const userRepository = new UserRepository()
  return new GetUserByIdUseCase(userRepository)
}
