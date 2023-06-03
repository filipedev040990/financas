import { GetCategoryByIdUseCase } from './get-category-by-id'
import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/get-category-by-id-repository.interface'
import { mock } from 'jest-mock-extended'

const categoryRepository = mock<GetCategoryByIdRepositoryInterface>()
const fakeCategory = {
  id: 'any id',
  name: 'any name'
}

describe('GetCategoryByIdUseCase', () => {
  let sut: GetCategoryByIdUseCase

  beforeAll(() => {
    sut = new GetCategoryByIdUseCase(categoryRepository)
    categoryRepository.getById.mockResolvedValue(fakeCategory)
  })

  test('should call CategoryRepository.getById once and with correct id', async () => {
    await sut.execute('any id')

    expect(categoryRepository.getById).toHaveBeenCalledTimes(1)
    expect(categoryRepository.getById).toHaveBeenCalledWith('any id')
  })

  test('should return null if CategoryRepository.getById returns null', async () => {
    categoryRepository.getById.mockResolvedValueOnce(null)

    const output = await sut.execute('any id')

    expect(output).toBeNull()
  })

  test('should reutn an category', async () => {
    categoryRepository.getById.mockResolvedValueOnce(fakeCategory)

    const output = await sut.execute('any id')

    expect(output).toEqual({
      id: 'any id',
      name: 'any name'
    })
  })
})
