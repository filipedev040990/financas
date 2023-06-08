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

  async execute ({ login, password }: AuthenticateUserUseCaseInterface.Input): Promise<AuthenticateUserUseCaseInterface.Output> {
    const user = await this.userRepository.getByLogin(login)
    if (user) {
      const isValidPassword = await this.hash.compare(password, user.password)
      if (isValidPassword) {
        return this.tokenGenerator.generate({ key: { id: user.id } })
      }
    }
    return null
  }
}
