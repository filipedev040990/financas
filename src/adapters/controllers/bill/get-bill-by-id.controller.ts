import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id.interface'

export class GetBillByIdController {
  constructor (private readonly getBillByIdUseCase: GetBillByIdUseCaseInterface) {}
  async execute (id: string): Promise<void> {
    await this.getBillByIdUseCase.execute(id)
  }
}
