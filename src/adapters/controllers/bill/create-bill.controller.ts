import { InvalidParamError } from '@/adapters/errors'
import { badRequest, success } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { CreateBillUseCaseInterface } from '@/application/interfaces/create-bill-usecase.interface'
import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/category-repository.interface'
import config from '@/infra/config'

export class CreateBillController {
  constructor (
    private readonly categoryRepository: GetCategoryByIdRepositoryInterface,
    private readonly calculateStatusBillUseCase: CalculateStatusBillUseCaseInterface,
    private readonly createBillUseCase: CreateBillUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<any> {
    const inputError = await this.inputValidation(input)
    if (inputError) {
      return badRequest(inputError)
    }

    const status = await this.calculateStatusBillUseCase.execute({ expiration: input.body.expiration })
    const newBill = await this.createBillUseCase.execute({
      type: input.body.type,
      category: input.body.category,
      expiration: input.body.expiration,
      interest: input.body.interest ?? 0,
      discount: input.body.discount ?? 0,
      total_value: input.body.total_value,
      observation: input.body.observation ?? 0,
      payment_method: input.body.payment_method,
      status
    })

    return success(201, newBill)
  }

  private async inputValidation (input: HttpRequest): Promise<Error | undefined> {
    const invalidPaymentTypeError = this.paymentTypeValidation(input.body?.type)
    if (invalidPaymentTypeError) {
      return invalidPaymentTypeError
    }

    const invalidPaymentCategoryError = await this.paymentCategoryValidation(input.body?.category)
    if (invalidPaymentCategoryError) {
      return invalidPaymentCategoryError
    }

    const invalidPaymentExpirationError = this.paymentExpirationValidation(input.body?.expiration)
    if (invalidPaymentExpirationError) {
      return invalidPaymentExpirationError
    }

    const invalidPaymentTotalValueError = this.paymentTotalValueValidation(input.body?.total_value)
    if (invalidPaymentTotalValueError) {
      return invalidPaymentTotalValueError
    }

    const invalidPaymentMethodError = this.paymentMethodValidation(input.body?.payment_method)
    if (invalidPaymentMethodError) {
      return invalidPaymentMethodError
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
      return new InvalidParamError('total_value')
    }
  }

  private paymentMethodValidation (method: string): Error | undefined {
    const allowedMethods = config.payment.methods
    if (!method || !allowedMethods.includes(method)) {
      return new InvalidParamError('payment_method')
    }
  }
}
