import { CreateBillUseCaseInterface } from '@/application/interfaces/create-bill-usecase.interface'
import MockDate from 'mockdate'
import { mock } from 'jest-mock-extended'
import { BillRepositoryInterface } from '@/domain/interfaces/bill-repository.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'

export class CreateBillUseCase {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly billRepository: BillRepositoryInterface
  ) {}

  async execute (input: CreateBillUseCaseInterface.Input): Promise<void> {
    await this.billRepository.create({
      id: this.uuidGenerator.execute(),
      type: input.type,
      category: input.category,
      expiration: input.expiration,
      discount: input.discount,
      interest: input.interest,
      occurence: input.occurence,
      payment_method: input.payment_method,
      total_value: input.total_value,
      observation: input?.observation,
      createdAt: new Date()
    })
  }
}

const billRepository = mock<BillRepositoryInterface>()
billRepository.create.mockResolvedValue({
  id: ' any id',
  type: 'any type',
  category: 'any category',
  expiration: new Date(),
  interest: 0,
  discount: 0,
  total_value: 1000,
  observation: null,
  payment_method: 'any payment method',
  occurence: 'any ocurrence',
  createdAt: new Date(),
  updatedAt: null
})

const uuidGenerator = mock<UUIDGeneratorInterface>()
uuidGenerator.execute.mockReturnValue('any uuid')

describe('CreateBillUseCase', () => {
  let sut: CreateBillUseCase
  let input: CreateBillUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new CreateBillUseCase(uuidGenerator, billRepository)
    input = {
      type: 'any type',
      category: 'any category',
      expiration: new Date(),
      discount: 0,
      interest: 0,
      occurence: 'any ocurrence',
      payment_method: 'any payment method',
      total_value: 1000
    }
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call BillRepository.create once and with correct values', async () => {
    await sut.execute(input)

    expect(billRepository.create).toHaveBeenCalledTimes(1)
    expect(billRepository.create).toHaveBeenCalledWith({
      id: 'any uuid',
      type: 'any type',
      category: 'any category',
      expiration: new Date(),
      discount: 0,
      interest: 0,
      occurence: 'any ocurrence',
      payment_method: 'any payment method',
      total_value: 1000,
      createdAt: new Date()
    })
  })
})
