import { GetAllCategoriesController } from './get-all-categories.controller'
import { GetAllCategoriesUseCaseInterface } from '@/application/interfaces/get-all-categories-usecase.interface'
import { mock } from 'jest-mock-extended'

const getAllCategoriesUseCase = mock<GetAllCategoriesUseCaseInterface>()

describe('GetAllCategoriesController', () => {
  let sut: GetAllCategoriesController

  beforeAll(() => {
    sut = new GetAllCategoriesController(getAllCategoriesUseCase)
  })
  test('should call GetAllCategoriesUseCase once', async () => {
    await sut.execute()

    expect(getAllCategoriesUseCase.execute).toHaveBeenCalledTimes(1)
  })
})
