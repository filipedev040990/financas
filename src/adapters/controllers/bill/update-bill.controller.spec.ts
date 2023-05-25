import { InvalidParamError } from '@/adapters/errors'
import { badRequest } from '@/adapters/helpers/http.helper'
import { HttpRequest } from '@/adapters/types/http.type'
import { CalculateStatusBillUseCaseInterface } from '@/application/interfaces/calculate-status-bill-usecase.interface'
import { GetBillByIdUseCaseInterface } from '@/application/interfaces/get-bill-by-id.interface'
import { GetCategoryByIdRepositoryInterface } from '@/domain/interfaces/get-category-by-id-repository.interface'
import { mock } from 'jest-mock-extended'

export class UpdateBillController {
  constructor (
    private readonly getBillByIdUseCase: GetBillByIdUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<any> {
    if (!input.params?.id) {
      return badRequest(new InvalidParamError('id'))
    }

    await this.getBillByIdUseCase.execute(input.params.id)
  }
}

const addDaysToDate = (date: Date, days: number): Date => {
  return new Date(date.setDate(date.getDate()) + days)
}

const categoryRepository = mock<GetCategoryByIdRepositoryInterface>()
const calculateStatusBillUseCase = mock<CalculateStatusBillUseCaseInterface>()
const getBillByIdUseCase = mock<GetBillByIdUseCaseInterface>()

describe('UpdateBillController', () => {
  let sut: UpdateBillController
  let input: HttpRequest

  beforeAll(() => {
    sut = new UpdateBillController(getBillByIdUseCase)
    calculateStatusBillUseCase.execute.mockResolvedValue('open')
  })

  beforeEach(() => {
    input = {
      params: {
        id: 'any bill id'
      },
      body: {
        type: 'pay',
        category_id: 'any category id',
        expiration: addDaysToDate(new Date(), 1),
        totalValue: 100,
        observation: ''
      }
    }
    categoryRepository.getById.mockResolvedValue({
      id: 'any id',
      name: 'any name'
    })
  })

  test('should return 400 if bill id does not provided', async () => {
    input.params.id = null

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(new InvalidParamError('id')))
  })

  test('should call GetBillByIdUseCase.execute once and with correct id', async () => {
    await sut.execute(input)

    expect(getBillByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getBillByIdUseCase.execute).toHaveBeenCalledWith(input.params.id)
  })
})
