import { HttpRequest } from '@/adapters/types/http.type'
import { MissingParamError } from '@/adapters/errors'
import { CreateUserUseCaseInterface } from '@/application/interfaces/create-user-usecase.interface'
import { CreateUserController } from './create-user.controller'
import { badRequest, serverError } from '@/adapters/helpers/http.helper'

const createUserUseCase: jest.Mocked<CreateUserUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue('any access token')
}

describe('CreateUserController', () => {
  let sut: CreateUserController
  let input: HttpRequest

  beforeAll(() => {
    sut = new CreateUserController(createUserUseCase)
  })

  beforeEach(() => {
    input = {
      body: {
        name: 'any name',
        login: 'any login',
        password: 'any password'
      }
    }
  })

  test('should return 400 if name is no provided', async () => {
    input.body.name = null

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should return 400 if password is no provided', async () => {
    input.body.password = null

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new MissingParamError('password')))
  })

  test('should call CreateUserUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(createUserUseCase.execute).toHaveBeenCalledTimes(1)
    expect(createUserUseCase.execute).toHaveBeenCalledWith({
      name: 'any name',
      login: 'any login',
      password: 'any password'
    })
  })

  test('should return an access token on success', async () => {
    const response = await sut.execute(input)

    expect(response).toEqual({
      statusCode: 200,
      body: {
        accessToken: 'any access token'
      }
    })
  })

  test('should return server error if CreateUserUseCase throws', async () => {
    createUserUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await sut.execute(input)

    expect(response).toEqual(serverError(new Error()))
  })
})
