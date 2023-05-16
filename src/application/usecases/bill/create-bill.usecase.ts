import { CreateBillUseCaseInterface } from '@/application/interfaces/create-bill-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import { BillRepositoryInterface } from '@/domain/interfaces/bill-repository.interface'

export class CreateBillUseCase {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly billRepository: BillRepositoryInterface
  ) {}

  async execute (input: CreateBillUseCaseInterface.Input): Promise<CreateBillUseCaseInterface.Output> {
    const output = await this.billRepository.create({
      id: this.uuidGenerator.execute(),
      type: input.type,
      category: input.category,
      expiration: input.expiration,
      discount: input.discount,
      interest: input.interest,
      payment_method: input.payment_method,
      total_value: input.total_value,
      observation: input?.observation,
      status: input.status,
      createdAt: new Date()
    })

    return output
  }
}
