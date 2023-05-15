import { InvalidParamError } from '@/adapters/errors'
import { badRequest } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'
import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/category-repository.interface'

export class CreateBillController {
  constructor (private readonly categoryRepository: GetCategoryByIdRepositoryInterface) {}
  async execute (input: HttpRequest): Promise<any> {
    const inputError = await this.inputValidation(input)
    if (inputError) {
      return badRequest(inputError)
    }
    return null
  }

  private async inputValidation (input: HttpRequest): Promise<Error | undefined> {
    const invalidPaymentTypeError = this.paymentTypeValidation(input.body?.type)
    if (invalidPaymentTypeError) {
      return invalidPaymentTypeError
    }

    await this.paymentCategoryValidation(input.body?.category)
  }

  private paymentTypeValidation (type: string): Error | undefined {
    const allowedTypes = ['pay', 'receive']
    if (!type || !allowedTypes.includes(type)) {
      return new InvalidParamError('type')
    }
  }

  private async paymentCategoryValidation (categoryId: string): Promise<Error | undefined> {
    if (!categoryId || !await this.categoryRepository.getById(categoryId)) {
      return new InvalidParamError('category')
    }
  }
}
