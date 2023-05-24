import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id.interface'
import { GetBillByIdController } from './get-bill-by-id.controller'
import { mock } from 'jest-mock-extended'

const getBillByIdUseCase = mock<GetBillByIdUseCaseInterface>()

describe('GetBillByIdController', () => {
  let sut: GetBillByIdController

  beforeAll(() => {
    sut = new GetBillByIdController(getBillByIdUseCase)
  })

  test('should call GetBillByIdUseCase once and with correct id', async () => {
    await sut.execute('any bill id')

    expect(getBillByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getBillByIdUseCase.execute).toHaveBeenCalledWith('any bill id')
  })
})
