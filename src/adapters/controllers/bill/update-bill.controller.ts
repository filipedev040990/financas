import { InvalidParamError } from '@/adapters/errors'
import { badRequest, success } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id.interface'
import { UpdateBillUseCaseInterface } from '@/application/interfaces/update-bill-usecase.interface'
import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/get-category-by-id-repository.interface'
import config from '@/infra/config'

export class UpdateBillController {
  constructor (
    private readonly getBillByIdUseCase: GetBillByIdUseCaseInterface,
    private readonly categoryRepository: GetCategoryByIdRepositoryInterface,
    private readonly calculateStatusBillUseCase: CalculateStatusBillUseCaseInterface,
    private readonly updateBillUseCase: UpdateBillUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<any> {
    const inputError = await this.inputValidation(input)
    if (inputError) {
      return badRequest(inputError)
    }

    const statusBill = await this.calculateStatusBillUseCase.execute({ expiration: new Date(input.body.expiration), totalValue: input.body.totalValue, billId: input.params.id })

    const updatedBill = await this.updateBillUseCase.execute({
      id: input.params.id,
      type: input.body.type,
      category_id: input.body.category_id,
      expiration: input.body.expiration,
      totalValue: input.body.totalValue,
      observation: input.body.observation,
      status: statusBill,
      updated_at: new Date()
    })

    return success(200, updatedBill)
  }

  private async inputValidation (input: HttpRequest): Promise<Error | undefined> {
    const invalidIdError = this.idValidation(input?.params?.id)
    if (invalidIdError) {
      return invalidIdError
    }

    const billExists = await this.getBillByIdUseCase.execute(input.params.id)
    if (!billExists) {
      return new InvalidParamError('bill not found')
    }

    const invalidStatusError = this.currentStatusValidation(billExists.bill.status)
    if (invalidStatusError) {
      return invalidStatusError
    }

    const invalidPaymentTypeError = this.paymentTypeValidation(input.body?.type)
    if (invalidPaymentTypeError) {
      return invalidPaymentTypeError
    }

    const invalidPaymentCategoryError = await this.paymentCategoryValidation(input.body?.category_id)
    if (invalidPaymentCategoryError) {
      return invalidPaymentCategoryError
    }

    const invalidPaymentExpirationError = this.paymentExpirationValidation(input.body?.expiration)
    if (invalidPaymentExpirationError) {
      return invalidPaymentExpirationError
    }

    const invalidPaymentTotalValueError = this.paymentTotalValueValidation(input.body?.totalValue)
    if (invalidPaymentTotalValueError) {
      return invalidPaymentTotalValueError
    }
  }

  private idValidation (id: string): Error | undefined {
    if (!id) {
      return new InvalidParamError('id')
    }
  }

  private currentStatusValidation (currentStatus: string): Error | undefined {
    const allowedStatusToUpdate = ['open', 'overdue']
    if (!allowedStatusToUpdate.includes(currentStatus)) {
      return new InvalidParamError('Bill status should be open or overdue')
    }
  }

  private paymentTypeValidation (type: string): Error | undefined {
    const allowedTypes = config.payment.types
    if (!type || !allowedTypes.includes(type)) {
      return new InvalidParamError('type')
    }
  }

  private async paymentCategoryValidation (categoryId: string): Promise<Error | undefined> {
    if (!categoryId || !await this.categoryRepository.getById(categoryId)) {
      return new InvalidParamError('category')
    }
  }

  private paymentExpirationValidation (date: Date): Error | undefined {
    if (!date) {
      return new InvalidParamError('expiration')
    }
  }

  private paymentTotalValueValidation (totalValue: number): Error | undefined {
    if (!totalValue || totalValue < 1) {
      return new InvalidParamError('totalValue')
    }
  }
}
