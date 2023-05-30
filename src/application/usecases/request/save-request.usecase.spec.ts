import { SaveRequestUseCaseInterface } from '@/application/interfaces/save-request-usecase.interface'
import { SaveRequestUseCase } from './save-log.usecase'
import { SaveRequestRepositoryInterface } from '@/domain/interfaces/save-request-repository.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const requestRepository = mock<SaveRequestRepositoryInterface>()
const uuidGenerator = mock<UUIDGeneratorInterface>()

describe('SaveRequestUseCase', () => {
  let sut: SaveRequestUseCase
  let input: SaveRequestUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new SaveRequestUseCase(uuidGenerator, requestRepository)
    input = {
      originalUrl: 'any url',
      input: '{any input}',
      ip: 'any ip',
      method: 'any method'
    }
    uuidGenerator.execute.mockReturnValue('any id')
    requestRepository.save.mockResolvedValue('any request id')
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LogRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(requestRepository.save).toHaveBeenCalledTimes(1)
    expect(requestRepository.save).toHaveBeenCalledWith({
      id: 'any id',
      originalUrl: 'any url',
      input: '{any input}',
      ip: 'any ip',
      method: 'any method',
      created_at: new Date()
    })
  })

  test('should return a request id correctly', async () => {
    const output = await sut.execute(input)

    expect(output).toBe('any request id')
  })
})
