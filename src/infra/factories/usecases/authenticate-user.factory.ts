import { AuthenticateUserUseCase } from '@/application/usecases/users/authenticate-user.usecase'
import { BcryptAdapter } from '@/infra/adapters/bcrypt.adapter'
import config from '@/infra/config'
import { UserRepository } from '@/infra/database/repositories/user.repository'
import { buildJwtAdapter } from '../adapters/jwt-adapter.factory'

export const buildAuthenticateUserUseCase = (): AuthenticateUserUseCase => {
  const userRepository = new UserRepository()
  const hashCompare = new BcryptAdapter(+config.bcrypt.salt)
  const tokenGenerator = buildJwtAdapter()
  return new AuthenticateUserUseCase(userRepository, hashCompare, tokenGenerator)
}
