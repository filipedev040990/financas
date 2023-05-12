import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { GetUserByIdUseCaseInterface } from '@/application/interfaces/get-user-by-id.interface'
import { UpdateUserUseCaseInterface } from '@/application/interfaces/update-user-usecase.interface'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, success, serverError } from '../helpers/http.helper'
import { HttpRequest } from '../types/http.type'

export class UpdateUserController implements ControllerInterface {
  constructor (
    private readonly getUserUseCase: GetUserByIdUseCaseInterface,
    private readonly updateUserUseCase: UpdateUserUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<any> {
    try {
      if (!input.params?.id) {
        return badRequest(new MissingParamError('id'))
      }

      if (!input.body.name) {
        return badRequest(new MissingParamError('name'))
      }

      const id = input.params.id
      const name = input.body.name

      const user = await this.getUserUseCase.execute(id)
      if (!user) {
        return badRequest(new InvalidParamError('User not found'))
      }

      await this.updateUserUseCase.execute({ id, name })
      return success(200, {})
    } catch (error) {
      return serverError(error)
    }
  }
}
