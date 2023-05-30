import { UpdateRequestUseCaseInterface } from '@/application/interfaces/update-request-usecase.interface'
import { UpdateRequestUseCase } from './update-request.usecase'
import { UpdateRequestRepositoryInterface } from '@/domain/interfaces/update-request-repository.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const updateRepository = mock<UpdateRequestRepositoryInterface>()

describe('UpdateRequestUseCase', () => {
  let sut: UpdateRequestUseCase
  let input: UpdateRequestUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new UpdateRequestUseCase(updateRepository)
    input = {
      id: 'any request id',
      output: 'any output',
      status: 200
    }
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call UpdateRequestRepository.update once and with correct values', async () => {
    await sut.execute(input)

    expect(updateRepository.update).toHaveBeenCalledTimes(1)
    expect(updateRepository.update).toHaveBeenCalledWith({
      id: 'any request id',
      output: 'any output',
      status: 200,
      updated_at: new Date()
    })
  })
})
