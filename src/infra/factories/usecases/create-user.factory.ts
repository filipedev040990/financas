import { CreateUserUseCase } from '@/application/usecases/users/create-user.usecase'
import { BcryptAdapter } from '@/infra/adapters/bcrypt.adapter'
import { UUIDAdapter } from '@/infra/adapters/uuid.adapter'
import { UserRepository } from '@/infra/database/repositories/user.repository'
import config from '@/infra/config'

export const buildCreateUserUseCase = (): CreateUserUseCase => {
  const uuidGenerator = new UUIDAdapter()

  const hashGenerator = new BcryptAdapter(+config.bcrypt.salt)

  const userRepository = new UserRepository()

  return new CreateUserUseCase(uuidGenerator, hashGenerator, userRepository)
}
