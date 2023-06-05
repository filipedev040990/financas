import { TokenGeneratorInterface } from '@/application/interfaces/token.interface'
import { JwtAdapter } from './jwt.adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

const input: TokenGeneratorInterface.Input = {
  key: {
    id: 'any id'
  }
}

const secretKey = 'any secret key'
const expirationInMs = 60000
const token = 'any_token'

describe('JwtAdapter', () => {
  let sut: JwtAdapter
  let fakeJwt: jest.Mocked<typeof jwt>

  beforeAll(() => {
    sut = new JwtAdapter(secretKey, expirationInMs)
    fakeJwt = jwt as jest.Mocked<typeof jwt>
    fakeJwt.sign.mockImplementation(() => token)
    fakeJwt.verify.mockImplementation(() => input)
  })

  describe('sign', () => {
    test('should call sign once and with correct values', () => {
      sut.generate(input)

      expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
      expect(fakeJwt.sign).toHaveBeenCalledWith({ key: { id: 'any id' } }, 'any secret key', { expiresIn: 60000 })
    })

    test('should return an access token on success', () => {
      const token = sut.generate(input)

      expect(token).toBe(token)
    })
  })

  describe('verify', () => {
    test('should call verify once and with correct values', () => {
      sut.validate({ token })

      expect(fakeJwt.verify).toHaveBeenCalledTimes(1)
      expect(fakeJwt.verify).toHaveBeenCalledWith('any_token', 'any secret key')
    })
    test('should return the key used', () => {
      const output = sut.validate({ token })

      expect(output).toEqual({ id: 'any id' })
    })
  })
})
