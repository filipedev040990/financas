import { HttpRequest } from '@/adapters/types/http.type'

export class CreateBillController {
  async execute (input: HttpRequest): Promise<void> {
    this.typeValidate(input.body?.type)
  }

  typeValidate (type: string): void {}
}

const addDaysToDate = (date: Date, days: number): Date => {
  return new Date(date.setDate(date.getDate()) + days)
}

const input: HttpRequest = {
  body: {
    type: 'any type',
    category: 'any category',
    expiration: addDaysToDate(new Date(), 1),
    interest: 0,
    discount: 0,
    total_value: 100,
    observation: '',
    payment_method: 'any payment method',
    occurence: 'weekly'
  }
}

describe('CreateBillController', () => {
  let sut: CreateBillController

  beforeAll(() => {
    sut = new CreateBillController()
  })
  test('should call validation type once and with correct value', async () => {
    const spy = jest.spyOn(sut, 'typeValidate')

    await sut.execute(input)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('any type')
  })
})
