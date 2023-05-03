import { HttpResponse } from '../types/http.type'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const success = (statusCode = 200, body: any): HttpResponse => ({
  statusCode,
  body
})
