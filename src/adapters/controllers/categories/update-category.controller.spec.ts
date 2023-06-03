import { HttpRequest } from '@/adapters/types/http.type'
import { UpdateCategoryController } from './update-category.controller'
import { badRequest } from '@/adapters/helpers/http.helper'
import { InvalidParamError, MissingParamError, ServerError } from '@/adapters/errors'
import { UpdateCategoryUseCaseInterface } from '@/application/interfaces/update-category-usecase.interface'
import { mock } from 'jest-mock-extended'
import { GetCategoryByIdUseCaseInterface } from '@/application/interfaces/get-category-by-id.interface'

const updateCategoryUseCase = mock<UpdateCategoryUseCaseInterface>()
const getCategoryByIdUseCase = mock<GetCategoryByIdUseCaseInterface>()

describe('UpdateCategoryController', () => {
  let sut: UpdateCategoryController
  let input: HttpRequest

  beforeEach(() => {
    sut = new UpdateCategoryController(updateCategoryUseCase, getCategoryByIdUseCase)
    input = {
      params: {
        id: 'any id'
      },
      body: {
        name: 'any name'
      }
    }
    getCategoryByIdUseCase.execute.mockResolvedValue({
      id: 'any id',
      name: 'any name'
    })
  })

  test('should return 400 if name is not provided', async () => {
    input.body.name = null

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should 400 if GetCategoryByIdUseCase returns null', async () => {
    getCategoryByIdUseCase.execute.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(new InvalidParamError('id')))
  })

  test('should call GetCategoryByIdUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(getCategoryByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getCategoryByIdUseCase.execute).toHaveBeenCalledWith('any id')
  })

  test('should call UpdateCategoryUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(updateCategoryUseCase.execute).toHaveBeenCalledTimes(1)
    expect(updateCategoryUseCase.execute).toHaveBeenCalledWith({ id: 'any id', name: 'any name' })
  })

  test('should return 201 on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 201,
      body: {}
    })
  })

  test('should return 500 if UpdateCategoryUseCase throws an exception', async () => {
    updateCategoryUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 500,
      body: new ServerError(new Error())
    })
  })
})
