import { HashGeneratorInterface } from '@/application/interfaces/crypto.interface'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockReturnValue('any hash')
}))

export class BcryptAdapter implements HashGeneratorInterface {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)
    return ''
  }
}

describe('BcryptAdapter', () => {
  let sut: BcryptAdapter
  let salt: number
  beforeAll(() => {
    salt = 12
    sut = new BcryptAdapter(salt)
  })

  test('should call bcrypt.hash once and with correct values', async () => {
    await sut.hash('any value')

    expect(bcrypt.hash).toHaveBeenCalledTimes(1)
    expect(bcrypt.hash).toHaveBeenCalledWith('any value', 12)
  })
})
