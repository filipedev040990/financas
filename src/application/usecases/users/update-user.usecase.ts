import { UpdateUserUseCaseInterface } from '@/application/interfaces/update-user-usecase.interface'
import { UpdateUserRepositoryInterface } from '@/domain/interfaces/user-repository.interface'

export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor (private readonly userRepository: UpdateUserRepositoryInterface) {}
  async execute (input: UpdateUserUseCaseInterface.Input): Promise<void> {
    await this.userRepository.update(input)
  }
}
