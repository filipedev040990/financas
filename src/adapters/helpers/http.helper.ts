import { JwtMissingError, ServerError, UnauthorizedError } from '../errors'
import { HttpResponse } from '../types/http.type'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const success = (statusCode = 200, body: any): HttpResponse => ({
  statusCode,
  body
})

export const serverError = (error: unknown): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error instanceof Error ? error : undefined)
})

export const forbidden = (): HttpResponse => ({
  statusCode: 403,
  body: new JwtMissingError()
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})
