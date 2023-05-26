import { UpdateBillUseCaseInterface } from '@/application/interfaces/update-bill-usecase.interface'
import { UpdateBillRepositoryInterface } from '@/domain/interfaces/update-bill-repository.interface'

export class UpdateBillUseCase {
  constructor (private readonly billRepository: UpdateBillRepositoryInterface) {}
  async execute (input: UpdateBillUseCaseInterface.Input): Promise<UpdateBillUseCaseInterface.Output> {
    return await this.billRepository.update({
      id: input.id,
      type: input.type,
      category_id: input.category_id,
      expiration: new Date(input.expiration),
      totalValue: input.totalValue,
      observation: input.observation,
      status: input.status,
      updated_at: new Date()
    })
  }
}
