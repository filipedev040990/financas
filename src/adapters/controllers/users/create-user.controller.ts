import { CreateUserUseCaseInterface } from '@/application/interfaces/create-user-usecase.interface'
import { badRequest, serverError, success } from '@/adapters/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'
import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { InvalidParamError, MissingParamError } from '@/adapters/errors'
import { GetUserByLoginUseCaseInterface } from '@/application/interfaces/get-user-by-login.interface'

export class CreateUserController implements ControllerInterface {
  constructor (
    private readonly getUserByLoginUseCase: GetUserByLoginUseCaseInterface,
    private readonly createUserUseCase: CreateUserUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const missingParam = this.validate(input)
      if (missingParam) {
        return badRequest(new MissingParamError(missingParam))
      }

      const { name, password, login } = input.body

      const userExists = await this.getUserByLoginUseCase.execute(login)
      if (userExists) {
        return badRequest(new InvalidParamError('This login already exists'))
      }

      const user = await this.createUserUseCase.execute({ name, password, login })

      return success(201, user)
    } catch (error) {
      return serverError(error)
    }
  }

  private validate (input: HttpRequest): string | undefined {
    const requiredFields = ['name', 'password', 'login']

    for (const field of requiredFields) {
      if (!input.body[field]) {
        return field
      }
    }
  }
}
