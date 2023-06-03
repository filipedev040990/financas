import { mock } from 'jest-mock-extended'
import { GetAllCategoriesUseCase } from './get-all-categories.usecase'
import { GetAllCategoriesRepositoryInterface } from '@/domain/interfaces/get-all-categories-repository'

const categoryRepository = mock<GetAllCategoriesRepositoryInterface>()

describe('GetAllCategoriesUseCase', () => {
  let sut: GetAllCategoriesUseCase

  beforeAll(() => {
    sut = new GetAllCategoriesUseCase(categoryRepository)
  })

  test('should call CategoriesRepository.getAll once', async () => {
    await sut.execute()

    expect(categoryRepository.getAll).toHaveBeenCalledTimes(1)
  })
})
