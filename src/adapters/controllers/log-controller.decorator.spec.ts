import { SaveRequestUseCaseInterface } from '@/application/interfaces/save-request-usecase.interface'
import { LogControllerDecorator } from './log-controller.decorator'
import { UpdateRequestUseCaseInterface } from '@/application/interfaces/update-request-usecase.interface'
import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { HttpRequest } from '../types/http.type'
import { mock } from 'jest-mock-extended'

const saveRequestUseCase = mock<SaveRequestUseCaseInterface>()
const updateRequestUseCase = mock<UpdateRequestUseCaseInterface>()
const controller = mock<ControllerInterface>()

describe('LogControllerDecorator', () => {
  let sut: LogControllerDecorator
  let input: HttpRequest

  beforeAll(() => {
    sut = new LogControllerDecorator(saveRequestUseCase, updateRequestUseCase, controller)
    input = {
      originalUrl: 'any url',
      method: 'any method',
      body: {
        name: 'any name'
      },
      headers: {
        'x-real-ip': null,
        'cf-connecting-ip': null,
        'x-forwarded-for': null
      },
      socket: {
        remoteAddress: 'any ip'
      }
    }

    saveRequestUseCase.execute.mockResolvedValue('any request id')
    controller.execute.mockResolvedValue({
      statusCode: 200,
      body: 'any body'
    })
  })

  test('should call saveRequestUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(saveRequestUseCase.execute).toHaveBeenCalledTimes(1)
    expect(saveRequestUseCase.execute).toHaveBeenCalledWith({
      originalUrl: 'any url',
      method: 'any method',
      ip: 'any ip',
      input: JSON.stringify(input.body)
    })
  })

  test('should call controller once with correct values', async () => {
    await sut.execute(input)

    expect(controller.execute).toHaveBeenCalledTimes(1)
    expect(controller.execute).toHaveBeenCalledWith(input)
  })

  test('should call updateRequestUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(updateRequestUseCase.execute).toHaveBeenCalledTimes(1)
    expect(updateRequestUseCase.execute).toHaveBeenCalledWith({
      id: 'any request id',
      output: JSON.stringify('any body'),
      status: 200
    })
  })

  test('should call updateRequestUseCase when controller throws', async () => {
    controller.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    await sut.execute(input)

    expect(updateRequestUseCase.execute).toHaveBeenCalledTimes(1)
    expect(updateRequestUseCase.execute).toHaveBeenCalledWith({
      id: 'any request id',
      output: JSON.stringify(new Error()),
      status: 500
    })
  })

  test('should return a response correctly', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 200,
      body: 'any body'
    })
  })
})
