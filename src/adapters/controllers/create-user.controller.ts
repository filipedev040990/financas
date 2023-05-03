import { CreateUserUseCaseInterface } from '@/application/interfaces/create-user-usecase.interface'
import { badRequest, serverError, success } from '@/adapters/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'
import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { MissingParamError } from '@/adapters/errors'

export class CreateUserController implements ControllerInterface {
  constructor (private readonly createUserUseCase: CreateUserUseCaseInterface) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const missingParam = this.validate(input)
      if (missingParam) {
        return badRequest(new MissingParamError(missingParam))
      }

      const { name, password } = input.body

      const accessToken = await this.createUserUseCase.execute({ name, password })

      return success(200, { accessToken })
    } catch (error) {
      return serverError(error)
    }
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
