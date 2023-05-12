import { GetUserByIdUseCaseInterface } from '@/application/interfaces/get-user-by-id.interface'
import { GetUserByIdRepositoryInterface } from '@/domain/interfaces/user-repository.interface'

export class GetUserByIdUseCase implements GetUserByIdUseCaseInterface {
  constructor (private readonly userRepository: GetUserByIdRepositoryInterface) {}
  async execute (id: string): Promise<GetUserByIdUseCaseInterface.Output> {
    return await this.userRepository.getById(id)
  }
}
