import { UpdateRequestUseCaseInterface } from '@/application/interfaces/update-request-usecase.interface'
import { UpdateRequestRepositoryInterface } from '@/domain/interfaces/update-request-repository.interface'

export class UpdateRequestUseCase implements UpdateRequestUseCaseInterface {
  constructor (private readonly updateRepository: UpdateRequestRepositoryInterface) {}
  async execute (input: UpdateRequestUseCaseInterface.Input): Promise<void> {
    await this.updateRepository.update({
      id: input.id,
      output: input.output,
      status: input.status,
      updated_at: new Date()
    })
  }
}
