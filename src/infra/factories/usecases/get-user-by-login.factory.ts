import { GetUserByLoginUseCase } from '@/application/usecases/users/get-user-by-login'
import { UserRepository } from '@/infra/database/repositories/user.repository'

export const buildGetUserByLoginUseCase = (): GetUserByLoginUseCase => {
  const userRepository = new UserRepository()
  return new GetUserByLoginUseCase(userRepository)
}
