import { UpdateUserUseCase } from '@/application/usecases/users/update-user.usecase'
import { UserRepository } from '@/infra/database/repositories/user.repository'

export const buildUpdateUser = (): UpdateUserUseCase => {
  const userRepository = new UserRepository()
  return new UpdateUserUseCase(userRepository)
}
