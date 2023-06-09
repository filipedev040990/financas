import { CreateBillUseCaseInterface } from '@/application/interfaces/create-bill-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import { CreateBillRepositoryInterface } from '@/domain/interfaces/create-bill-repository.interface'

export class CreateBillUseCase {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly billRepository: CreateBillRepositoryInterface
  ) {}

  async execute (input: CreateBillUseCaseInterface.Input): Promise<CreateBillUseCaseInterface.Output> {
    return await this.billRepository.create({
      id: this.uuidGenerator.execute(),
      type: input.type,
      category_id: input.category_id,
      expiration: new Date(input.expiration),
      totalValue: input.totalValue,
      observation: input.observation,
      status: input.status,
      created_at: new Date()
    })
  }
}
