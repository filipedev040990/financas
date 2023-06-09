import { GetUserByIdUseCaseInterface } from '@/application/interfaces/get-user-by-id.interface'
import { UpdateUserUseCaseInterface } from '@/application/interfaces/update-user-usecase.interface'
import { HttpRequest } from '@/adapters/types/http.type'
import { badRequest, serverError } from '@/adapters/helpers/http.helper'
import { InvalidParamError, MissingParamError } from '@/adapters/errors'
import { UpdateUserController } from './update-user.controller'
import { mock } from 'jest-mock-extended'

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

  test('should return 200 on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 200,
      body: {}
    })
  })

  test('should return 500 if GetUserByIdUseCase throws', async () => {
    getUserUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    const output = await sut.execute(input)

    expect(output).toEqual(serverError(new Error()))
  })
})
