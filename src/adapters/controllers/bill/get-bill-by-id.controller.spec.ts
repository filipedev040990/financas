import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id.interface'
import { GetBillByIdController } from './get-bill-by-id.controller'
import { mock } from 'jest-mock-extended'
import { HttpRequest } from '@/adapters/types/http.type'

const getBillByIdUseCase = mock<GetBillByIdUseCaseInterface>()

describe('GetBillByIdController', () => {
  let sut: GetBillByIdController
  let input: HttpRequest

  beforeAll(() => {
    sut = new GetBillByIdController(getBillByIdUseCase)
  })

  beforeEach(() => {
    input = {
      params: {
        id: 'any bill id'
      }
    }
  })

  test('should call GetBillByIdUseCase once and with correct id', async () => {
    await sut.execute(input)

    expect(getBillByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getBillByIdUseCase.execute).toHaveBeenCalledWith('any bill id')
  })

  test('should return null if GetBillByIdUseCase returns null', async () => {
    getBillByIdUseCase.execute.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 200,
      body: null
    })
  })
})
