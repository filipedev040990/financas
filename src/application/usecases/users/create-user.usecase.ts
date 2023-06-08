import { CreateUserUseCaseInterface } from '@/application/interfaces/create-user-usecase.interface'
import { HashGeneratorInterface } from '@/application/interfaces/crypto.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import { UserEntity } from '@/domain/entities/user.entity'
import { CreateUserRepositoryInterface } from '@/domain/interfaces/user-repository.interface'

export class CreateUserUseCase {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly hashGenerator: HashGeneratorInterface,
    private readonly userRepository: CreateUserRepositoryInterface
  ) {}

  async execute (input: CreateUserUseCaseInterface.Input): Promise<CreateUserUseCaseInterface.Output> {
    const newUser = new UserEntity({
      id: this.uuidGenerator.execute(),
      name: input.name,
      login: input.login,
      password: await this.hashGenerator.hash(input.password)
    })

    return await this.userRepository.save({
      id: newUser.id,
      name: newUser.name,
      login: newUser.login,
      password: newUser.password,
      created_at: newUser.created_at
    })
  }
}
