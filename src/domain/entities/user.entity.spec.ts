import { UserEntity } from './user.entity'
import MockDate from 'mockdate'

describe('UserEntity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should create a instance of User', () => {
    const user = new UserEntity({
      id: 'any id',
      name: 'any name',
      password: 'any password'
    })

    expect(user).toEqual({
      id: 'any id',
      name: 'any name',
      password: 'any password',
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })
})