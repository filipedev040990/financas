import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { HttpRequest } from '../types/http.type'
import { badRequest } from '../helpers/http.helper'
import { InvalidParamError, MissingParamError } from '../errors'
import { mock } from 'jest-mock-extended'
import { GetUserByIdUseCaseInterface } from '@/application/interfaces/get-user-by-id.interface'
import { UpdateUserUseCaseInterface } from '@/application/interfaces/update-user-usecase.interface'

export class UpdateUserController implements ControllerInterface {
  constructor (
    private readonly getUserUseCase: GetUserByIdUseCaseInterface,
    private readonly updateUserUseCase: UpdateUserUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<any> {
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
    return null
  }
}

const getUserUseCase = mock<GetUserByIdUseCaseInterface>()
const updateUserUseCase = mock<UpdateUserUseCaseInterface>()

describe('UpdateUserController', () => {
  let sut: UpdateUserController
  let input: HttpRequest

  beforeAll(() => {
    sut = new UpdateUserController(getUserUseCase, updateUserUseCase)
    getUserUseCase.execute.mockResolvedValue({
      id: 'any id',
      name: 'any name',
      login: 'any login'
    })
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

  test('should return 400 if GetUserByIdUseCase returns null', async () => {
    getUserUseCase.execute.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(new InvalidParamError('User not found')))
  })

  test('should call UpdateUserUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(updateUserUseCase.execute).toHaveBeenCalledTimes(1)
    expect(updateUserUseCase.execute).toHaveBeenCalledWith({ id: 'any id', name: 'any name' })
  })
})
