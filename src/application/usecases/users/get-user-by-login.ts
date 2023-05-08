import { GetUserByLoginUseCaseInterface } from '@/application/interfaces/get-user-by-login.interface'
import { GetUserByLoginRepositoryInterface } from '@/domain/interfaces/user-repository.interface'

export class GetUserByLoginUseCase implements GetUserByLoginUseCaseInterface {
  constructor (private readonly userRepository: GetUserByLoginRepositoryInterface) {}
  async execute (login: string): Promise<GetUserByLoginUseCaseInterface.Output> {
    return await this.userRepository.getByLogin(login)
  }
}
