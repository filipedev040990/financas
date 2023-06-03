import { mock } from 'jest-mock-extended'
import { GetAllCategoriesUseCase } from './get-all-categories.usecase'
import { GetAllCategoriesRepositoryInterface } from '@/domain/interfaces/get-all-categories-repository'

const categoryRepository = mock<GetAllCategoriesRepositoryInterface>()
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

describe('GetAllCategoriesUseCase', () => {
  let sut: GetAllCategoriesUseCase

  beforeAll(() => {
    sut = new GetAllCategoriesUseCase(categoryRepository)
    categoryRepository.getAll.mockResolvedValue(fakeCategories)
  })

  test('should call CategoriesRepository.getAll once', async () => {
    await sut.execute()

    expect(categoryRepository.getAll).toHaveBeenCalledTimes(1)
  })

  test('should return all categories', async () => {
    const output = await sut.execute()

    expect(output).toEqual(fakeCategories)
  })
})
