import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import crypto from 'crypto'

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('any uuid')
}))

export class UUIDAdapter implements UUIDGeneratorInterface {
  execute (): string {
    return crypto.randomUUID()
  }
}

describe('UUIDAdapter', () => {
  test('should call uuid', () => {
    const sut = new UUIDAdapter()

    sut.execute()

    expect(crypto.randomUUID).toHaveBeenCalledTimes(1)
  })

  test('should return an uuid', () => {
    const sut = new UUIDAdapter()

    const response = sut.execute()

    expect(response).toBe('any uuid')
  })
})
