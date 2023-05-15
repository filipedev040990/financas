import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { GetUserByIdUseCaseInterface } from '@/application/interfaces/get-user-by-id.interface'
import { UpdateUserUseCaseInterface } from '@/application/interfaces/update-user-usecase.interface'
import { MissingParamError, InvalidParamError } from '@/adapters/errors'
import { badRequest, success, serverError } from '@/adapters/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'

export class UpdateUserController implements ControllerInterface {
  constructor (
    private readonly getUserUseCase: GetUserByIdUseCaseInterface,
    private readonly updateUserUseCase: UpdateUserUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<any> {
    try {
      const error = await this.validate(input)
      if (error) {
        return error
      }

      const id = input.params.id
      const name = input.body.name

      await this.updateUserUseCase.execute({ id, name })

      return success(200, {})
    } catch (error) {
      return serverError(error)
    }
  }

  private async validate (input: HttpRequest): Promise<HttpResponse | undefined> {
    if (!input.params?.id) {
      return badRequest(new MissingParamError('id'))
    }

    if (!input.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    const user = await this.getUserUseCase.execute(input.params.id)
    if (!user) {
      return badRequest(new InvalidParamError('User not found'))
    }
  }
}
