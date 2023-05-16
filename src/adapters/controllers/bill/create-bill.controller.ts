import { InvalidParamError } from '@/adapters/errors'
import { badRequest } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/category-repository.interface'
import config from '@/infra/config'

export class CreateBillController {
  constructor (
    private readonly categoryRepository: GetCategoryByIdRepositoryInterface,
    private readonly calculateStatusBillUseCase: CalculateStatusBillUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<any> {
    const inputError = await this.inputValidation(input)
    if (inputError) {
      return badRequest(inputError)
    }

    await this.calculateStatusBillUseCase.execute({ expiration: input.body.expiration })
    return null
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
