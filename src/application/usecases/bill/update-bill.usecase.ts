import { UpdateBillUseCaseInterface } from '@/application/interfaces/update-bill-usecase.interface'
import { UpdateBillRepositoryInterface } from '@/domain/interfaces/update-bill-repository.interface'

export class UpdateBillUseCase {
  constructor (private readonly billRepository: UpdateBillRepositoryInterface) {}
  async execute (input: UpdateBillUseCaseInterface.Input): Promise<UpdateBillUseCaseInterface.Output> {
    return await this.billRepository.update(input)
  }
}
