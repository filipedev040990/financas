import { CreateUserUseCaseInterface } from '@/application/interfaces/create-user-usecase.interface'
import { HashGeneratorInterface } from '@/application/interfaces/crypto.interface'
import { TokenGeneratorInterface } from '@/application/interfaces/token.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import { UserEntity } from '@/domain/entities/user.entity'
import { CreateUserRepositoryInterface } from '@/domain/interfaces/user-repository.interface'

export class CreateUserUseCase {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly hashGenerator: HashGeneratorInterface,
    private readonly userRepository: CreateUserRepositoryInterface,
    private readonly tokenGenerator: TokenGeneratorInterface
  ) {}

  async execute (input: CreateUserUseCaseInterface.Input): Promise<CreateUserUseCaseInterface.Output> {
    const newUser = new UserEntity({
      id: this.uuidGenerator.execute(),
      name: input.name,
      password: this.hashGenerator.execute(input.password)
    })

    await this.userRepository.save({
      id: newUser.id,
      name: newUser.name,
      password: newUser.password,
      createdAt: newUser.createdAt
    })

    const accessToken = this.tokenGenerator.generate({
      key: {
        id: newUser.id
      }
    })

    return accessToken
  }
}
