import { TokenGeneratorInterface } from '@/application/interfaces/token.interface'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

export class JwtAdapter implements TokenGeneratorInterface {
  constructor (
    private readonly secretKey: string,
    private readonly expirationInMs: number
  ) {}

  generate (input: TokenGeneratorInterface.Input): string {
    return jwt.sign({ key: input.key }, this.secretKey, { expiresIn: this.expirationInMs })
  }
}

const input: TokenGeneratorInterface.Input = {
  key: {
    id: 'any id'
  }
}

const secretKey = 'any secret key'
const expirationInMs = 60000

describe('JwtAdapter', () => {
  let sut: JwtAdapter
  let fakeJwt: jest.Mocked<typeof jwt>

  beforeAll(() => {
    sut = new JwtAdapter(secretKey, expirationInMs)
    fakeJwt = jwt as jest.Mocked<typeof jwt>
    fakeJwt.sign.mockImplementation(() => 'any token')
  })

  test('should call sign once and with correct values', () => {
    sut.generate(input)

    expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
    expect(fakeJwt.sign).toHaveBeenCalledWith({ key: { id: 'any id' } }, 'any secret key', { expiresIn: 60000 })
  })

  test('should return an access token on success', () => {
    const token = sut.generate(input)

    expect(token).toBe('any token')
  })
})
