import { mock } from 'jest-mock-extended'
import { CreateCategoryUseCase } from './create-category.usecase'
import { CreateCategoryRepositoryInterface } from '@/domain/interfaces/create-category-repository.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import MockDate from 'mockdate'

const categoryRepository = mock<CreateCategoryRepositoryInterface>()
const uuidGenerator = mock<UUIDGeneratorInterface>()

describe('CreateCategoryUseCase', () => {
  let sut: CreateCategoryUseCase
  let name: string

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new CreateCategoryUseCase(uuidGenerator, categoryRepository)
    name = 'any name'
    uuidGenerator.execute.mockReturnValue('any id')
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call Category.repository.create once and with correct values', async () => {
    await sut.execute(name)

    expect(categoryRepository.create).toHaveBeenCalledTimes(1)
    expect(categoryRepository.create).toHaveBeenCalledWith({
      id: 'any id',
      name,
      created_at: new Date()
    })
  })
})
