import { HttpRequest } from '@/adapters/types/http.type'
import { CreateCategoryController } from './create-category.controller'
import { badRequest } from '@/adapters/helpers/http.helper'
import { MissingParamError, ServerError } from '@/adapters/errors'
import { mock } from 'jest-mock-extended'
import { CreateCategoryUseCaseInterface } from '@/application/interfaces/create-category-usecase.interface'

const createCategoryUseCase = mock<CreateCategoryUseCaseInterface>()

describe('CreateCategoryController', () => {
  let sut: CreateCategoryController
  let input: HttpRequest

  beforeEach(() => {
    sut = new CreateCategoryController(createCategoryUseCase)
    input = {
      body: {
        name: 'any name'
      }
    }
  })

  test('should return 400 if name is not provided', async () => {
    input.body.name = null

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should call CreateCategoryUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(createCategoryUseCase.execute).toHaveBeenCalledTimes(1)
    expect(createCategoryUseCase.execute).toHaveBeenCalledWith('any name')
  })

  test('should return 201 on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 201,
      body: null
    })
  })

  test('should return 500 if CreateCategoryUseCase throws an exception', async () => {
    createCategoryUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 500,
      body: new ServerError(new Error())
    })
  })
})
