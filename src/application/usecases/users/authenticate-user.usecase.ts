import { AuthenticateUserUseCaseInterface } from '@/application/interfaces/authenticate-user-usecase.interface'
import { HashCompareInterface } from '@/application/interfaces/crypto.interface'
import { GetUserByLoginRepositoryInterface } from '@/domain/interfaces/user-repository.interface'

export class AuthenticateUserUseCase implements AuthenticateUserUseCaseInterface {
  constructor (
    private readonly userRepository: GetUserByLoginRepositoryInterface,
    private readonly hash: HashCompareInterface
  ) {}

  async execute (input: AuthenticateUserUseCaseInterface.Input): Promise<AuthenticateUserUseCaseInterface.Output> {
    const user = await this.userRepository.getByLogin(input.login)
    if (!user) {
      return null
    }

    await this.hash.compare(input.password, user.password)
    return ''
  }
}
