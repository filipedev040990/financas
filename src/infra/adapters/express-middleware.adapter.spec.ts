import { NextFunction, Request, RequestHandler, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock, MockProxy } from 'jest-mock-extended'
import { AuthenticationMiddlewareInterface } from '@/application/interfaces/authentication-middleware.interface'
import { expressAdapterMiddleware } from './express-middleware.adapter'

let req: Request
let res: Response
let next: NextFunction
let middleware: MockProxy<AuthenticationMiddlewareInterface>
let sut: RequestHandler

describe('expressAdapterMiddleware ', () => {
  beforeEach(() => {
    req = getMockReq({ headers: { Authorization: 'any_token' } })
    res = getMockRes().res
    next = getMockRes().next
    middleware = mock()
    middleware.execute.mockResolvedValue({
      statusCode: 200,
      body: { userId: 'anyUserId' }
    })
    sut = expressAdapterMiddleware(middleware)
  })

  test('should call execute with correct request', async () => {
    await sut(req, res, next)

    expect(middleware.execute).toHaveBeenCalledTimes(1)
    expect(middleware.execute).toHaveBeenCalledWith({ headers: { Authorization: 'any_token' } })
  })
})
