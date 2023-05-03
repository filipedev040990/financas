import { UUIDAdapter } from './uuid.adapter'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import crypto from 'crypto'

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('any uuid')
}))

describe('UUIDAdapter', () => {
  let sut: UUIDGeneratorInterface

  beforeAll(() => {
    sut = new UUIDAdapter()
  })
  test('should call uuid', () => {
    sut.execute()

    expect(crypto.randomUUID).toHaveBeenCalledTimes(1)
  })

  test('should return an uuid', () => {
    const response = sut.execute()

    expect(response).toBe('any uuid')
  })
})
