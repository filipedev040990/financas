import { CreateUserUseCase } from '@/application/usecases/users/create-user.usecase'
import { BcryptAdapter } from '@/infra/adapters/bcrypt.adapter'
import { UUIDAdapter } from '@/infra/adapters/uuid.adapter'
import { UserRepository } from '@/infra/database/repositories/user.repository'
import { buildJwtAdapter } from '../adapters/jwt-adapter.factory'

export const buildCreateUserUseCase = (): CreateUserUseCase => {
  const uuidGenerator = new UUIDAdapter()

  const salt = process.env.BCRYPT_SALT ?? 12
  const hashGenerator = new BcryptAdapter(+salt)

  const userRepository = new UserRepository()

  const tokenGenerator = buildJwtAdapter()

  return new CreateUserUseCase(uuidGenerator, hashGenerator, userRepository, tokenGenerator)
}
