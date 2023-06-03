import { GetCategoryByIdUseCaseInterface } from '@/application/interfaces/get-category-by-id.interface'
import { mock } from 'jest-mock-extended'
import { GetCategoryByIdController } from './get-category-by-id.controller'
import { HttpRequest } from '@/adapters/types/http.type'
import { ServerError } from '@/adapters/errors'

const getCategoryByIdUseCase = mock<GetCategoryByIdUseCaseInterface>()
const fakeCategories = {
  id: 'any id',
  name: 'any name',
  created_at: new Date('2023-01-01')
}

describe('GetCategoryByIdController', () => {
  let sut: GetCategoryByIdController
  let input: HttpRequest

  beforeAll(() => {
    sut = new GetCategoryByIdController(getCategoryByIdUseCase)
    input = {
      params: {
        id: 'any id'
      }
    }
    getCategoryByIdUseCase.execute.mockResolvedValue(fakeCategories)
  })

  test('should call GetAllCategoriesUseCase once and with correct id', async () => {
    await sut.execute(input)

    expect(getCategoryByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getCategoryByIdUseCase.execute).toHaveBeenCalledWith('any id')
  })

  test('should return an category', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 200,
      body: fakeCategories
    })
  })

  test('should return 500 if GetAllCategoriesUseCase throws', async () => {
    getCategoryByIdUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 500,
      body: new ServerError(new Error())
    })
  })
})
