import { UpdateCategoryUseCaseInterface } from '@/application/interfaces/update-category-usecase.interface'
import { UpdateCategoryUseCase } from './update-category.usecase'
import { UpdateCategoryRepositoryInterface } from '@/domain/interfaces/update-category-repository.interface'
import MockDate from 'mockdate'
import { mock } from 'jest-mock-extended'

const categoryRepository = mock<UpdateCategoryRepositoryInterface>()

describe('UpdateCategoryUseCase', () => {
  let sut: UpdateCategoryUseCase
  let input: UpdateCategoryUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new UpdateCategoryUseCase(categoryRepository)
    input = {
      id: 'any id',
      name: 'any name'
    }
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call CategoryRepository.update once and with correct values', async () => {
    await sut.execute(input)

    expect(categoryRepository.update).toHaveBeenCalledTimes(1)
    expect(categoryRepository.update).toHaveBeenCalledWith({
      id: 'any id',
      name: 'any name',
      updated_at: new Date()
    })
  })
})
