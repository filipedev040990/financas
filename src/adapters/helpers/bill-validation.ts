import config from '@/infra/config'
import { InvalidParamError } from '../errors'
import { HttpRequest } from '../types/http.type'
import { RequiredFieldValidator } from '../validation/required-field'
import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id.interface'
import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/get-category-by-id-repository.interface'
import { BillValidatorInterface } from '@/application/interfaces/bill-validation.interface'

export class ValidatorBill implements BillValidatorInterface {
  constructor (
    private readonly getBillByIdUseCase: GetBillByIdUseCaseInterface,
    private readonly categoryRepository: GetCategoryByIdRepositoryInterface
  ) {}

  async validate (input: HttpRequest): Promise<Error | undefined> {
    if (input.params?.id) {
      const billExists = await this.getBillByIdUseCase.execute(input.params.id)
      if (!billExists) {
        return new InvalidParamError('bill not found')
      }

      const invalidStatusError = this.currentStatusValidation(billExists.bill.status)
      if (invalidStatusError) {
        return invalidStatusError
      }
    }

    const requiredFields = ['type', 'category_id', 'expiration', 'totalValue']

    for (const field of requiredFields) {
      const error = new RequiredFieldValidator(field, input.body[field]).validate()
      if (error) {
        return error
      }
    }

    const invalidPaymentTypeError = this.paymentTypeValidation(input.body.type)
    if (invalidPaymentTypeError) {
      return invalidPaymentTypeError
    }

    const invalidPaymentCategoryError = await this.paymentCategoryValidation(input.body?.category_id)
    if (invalidPaymentCategoryError) {
      return invalidPaymentCategoryError
    }

    const invalidPaymentTotalValueError = this.paymentTotalValueValidation(input.body?.totalValue)
    if (invalidPaymentTotalValueError) {
      return invalidPaymentTotalValueError
    }
  }

  private currentStatusValidation (currentStatus: string): Error | undefined {
    const allowedStatusToUpdate = ['open', 'expired']
    if (!allowedStatusToUpdate.includes(currentStatus)) {
      return new InvalidParamError('Bill status should be open or expired')
    }
  }

  private paymentTypeValidation (type: string): Error | undefined {
    const allowedTypes = config.payment.types
    if (!allowedTypes.includes(type)) {
      return new InvalidParamError('type')
    }
  }

  private async paymentCategoryValidation (categoryId: string): Promise<Error | undefined> {
    if (!await this.categoryRepository.getById(categoryId)) {
      return new InvalidParamError('category_id')
    }
  }

  private paymentTotalValueValidation (totalValue: number): Error | undefined {
    if (totalValue < 1) {
      return new InvalidParamError('totalValue')
    }
  }
}
