import { InvalidParamError } from '@/adapters/errors'
import { badRequest, serverError, success } from '@/adapters/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { CreateBillUseCaseInterface } from '@/application/interfaces/create-bill-usecase.interface'
import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/get-category-by-id-repository.interface'
import config from '@/infra/config'

export class CreateBillController implements ControllerInterface {
  constructor (
    private readonly categoryRepository: GetCategoryByIdRepositoryInterface,
    private readonly calculateStatusBillUseCase: CalculateStatusBillUseCaseInterface,
    private readonly createBillUseCase: CreateBillUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const inputError = await this.inputValidation(input)
      if (inputError) {
        return badRequest(inputError)
      }

      const statusBill = await this.calculateStatusBillUseCase.execute({ expiration: new Date(input.body.expiration), totalValue: input.body.totalValue, billId: '' })

      const newBill = await this.createBillUseCase.execute({
        type: input.body.type,
        category_id: input.body.category_id,
        expiration: input.body.expiration,
        totalValue: input.body.totalValue,
        observation: input.body.observation,
        status: statusBill
      })

      return success(201, newBill)
    } catch (error) {
      return serverError(error)
    }
  }

  private async inputValidation (input: HttpRequest): Promise<Error | undefined> {
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
