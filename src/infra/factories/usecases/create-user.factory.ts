import { CreateUserUseCase } from '@/application/usecases/users/create-user.usecase'
import { BcryptAdapter } from '@/infra/adapters/bcrypt.adapter'
import { JwtAdapter } from '@/infra/adapters/jwt.adapter'
import { UUIDAdapter } from '@/infra/adapters/uuid.adapter'
import { UserRepository } from '@/infra/database/repositories/user.repository'

export const buildCreateUserUseCase = (): CreateUserUseCase => {
  const uuidGenerator = new UUIDAdapter()

  const salt = process.env.BCRYPT_SALT ?? 12
  const hashGenerator = new BcryptAdapter(+salt)

  const userRepository = new UserRepository()

  const secretkey = process.env.JWT_SECRET_KEY ?? 'b39311c63373f445534e3e8677f8d4c3'
  const expirationInMs = process.env.JWT_EXPIRATION_IN_MS ?? 86400000
  const tokenGenerator = new JwtAdapter(secretkey, +expirationInMs)

  return new CreateUserUseCase(uuidGenerator, hashGenerator, userRepository, tokenGenerator)
}
