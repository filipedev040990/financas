import { AuthenticateUserUseCaseInterface } from '@/application/interfaces/authenticate-user-usecase.interface'
import { HashCompareInterface } from '@/application/interfaces/crypto.interface'
import { TokenGeneratorInterface } from '@/application/interfaces/token.interface'
import { GetUserByLoginRepositoryInterface } from '@/domain/interfaces/user-repository.interface'

export class AuthenticateUserUseCase implements AuthenticateUserUseCaseInterface {
  constructor (
    private readonly userRepository: GetUserByLoginRepositoryInterface,
    private readonly hash: HashCompareInterface,
    private readonly tokenGenerator: TokenGeneratorInterface
  ) {}

  async execute (input: AuthenticateUserUseCaseInterface.Input): Promise<AuthenticateUserUseCaseInterface.Output> {
    const user = await this.userRepository.getByLogin(input.login)
    if (user) {
      const isValidPassword = await this.hash.compare(input.password, user.password)
      if (isValidPassword) {
        this.tokenGenerator.generate({ key: { id: user.id } })
      }
    }
    return null
  }
}
