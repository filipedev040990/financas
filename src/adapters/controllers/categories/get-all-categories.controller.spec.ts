import { GetAllCategoriesController } from './get-all-categories.controller'
import { GetAllCategoriesUseCaseInterface } from '@/application/interfaces/get-all-categories-usecase.interface'
import { mock } from 'jest-mock-extended'

const getAllCategoriesUseCase = mock<GetAllCategoriesUseCaseInterface>()
const fakeCategories = [{
  id: 'any id',
  name: 'any name',
  created_at: new Date('2023-01-01')
}, {
  id: 'another id',
  name: 'another name',
  created_at: new Date('2023-06-01'),
  updated_at: new Date()
}]

describe('GetAllCategoriesController', () => {
  let sut: GetAllCategoriesController

  beforeAll(() => {
    sut = new GetAllCategoriesController(getAllCategoriesUseCase)
    getAllCategoriesUseCase.execute.mockResolvedValue(fakeCategories)
  })

  test('should call GetAllCategoriesUseCase once', async () => {
    await sut.execute()

    expect(getAllCategoriesUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return all categories', async () => {
    const output = await sut.execute()

    expect(output).toEqual({
      statusCode: 200,
      body: fakeCategories
    })
  })
})
