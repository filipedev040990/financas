import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { HttpRequest } from '../types/http.type'
import { badRequest } from '../helpers/http.helper'
import { MissingParamError } from '../errors'
import { mock } from 'jest-mock-extended'
import { GetUserByIdUseCaseInterface } from '@/application/interfaces/get-user-by-id.interface'

export class UpdateUserController implements ControllerInterface {
  constructor (private readonly getUserUseCase: GetUserByIdUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<any> {
    if (!input.params?.id) {
      return badRequest(new MissingParamError('id'))
    }

    if (!input.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    await this.getUserUseCase.execute(input.params.id)

    return null
  }
}

const getUserUseCase = mock<GetUserByIdUseCaseInterface>()

describe('UpdateUserController', () => {
  let sut: UpdateUserController
  let input: HttpRequest

  beforeAll(() => {
    sut = new UpdateUserController(getUserUseCase)
  })
  beforeEach(() => {
    input = {
      params: {
        id: 'any id'
      },
      body: {
        name: 'any name'
      }
    }
  })

  test('should return 400 if id is not provided', async () => {
    input.params.id = null

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(new MissingParamError('id')))
  })

  test('should return 400 if name is not provided', async () => {
    input.body.name = null

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should call GetUserByIdUseCase once and with correct id', async () => {
    await sut.execute(input)

    expect(getUserUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getUserUseCase.execute).toHaveBeenCalledWith('any id')
  })
})
