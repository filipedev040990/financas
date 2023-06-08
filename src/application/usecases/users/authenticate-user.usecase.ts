import { AuthenticateUserUseCaseInterface } from '@/application/interfaces/authenticate-user-usecase.interface'
import { GetUserByIdRepositoryInterface } from '@/domain/interfaces/user-repository.interface'

export class AuthenticateUserUseCase implements AuthenticateUserUseCaseInterface {
  constructor (
    private readonly userRepository: GetUserByIdRepositoryInterface
  ) {}

  async execute (input: AuthenticateUserUseCaseInterface.Input): Promise<string> {
    await this.userRepository.getById(input.login)
    return ''
  }
}
