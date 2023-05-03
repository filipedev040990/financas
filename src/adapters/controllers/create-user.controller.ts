import { CreateUserUseCaseInterface } from '@/application/interfaces/create-user-usecase.interface'
import { MissingParamError } from '@/adapters/errors/missing-param.error'
import { badRequest, success } from '@/adapters/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'
import { ControllerInterface } from '@/application/interfaces/controller.interface'

export class CreateUserController implements ControllerInterface {
  constructor (private readonly createUserUseCase: CreateUserUseCaseInterface) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    const missingParam = this.validate(input)
    if (missingParam) {
      return badRequest(new MissingParamError(missingParam))
    }

    const { name, password } = input.body
    const accessToken = await this.createUserUseCase.execute({ name, password })
    return success(200, { accessToken })
  }

  private validate (input: HttpRequest): string | undefined {
    const requiredFields = ['name', 'password']

    for (const field of requiredFields) {
      if (!input.body[field]) {
        return field
      }
    }
  }
}
