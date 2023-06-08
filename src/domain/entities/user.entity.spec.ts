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
      login: 'any login',
      password: 'any password'
    })

    expect(user).toEqual({
      id: 'any id',
      name: 'any name',
      login: 'any login',
      password: 'any password',
      created_at: new Date(),
      updated_at: new Date()
    })
  })
})
