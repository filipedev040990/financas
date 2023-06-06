import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'
import { AuthenticationMiddlewareInterface } from '@/application/interfaces/authentication-middleware.interface'
import { NextFunction, Request, Response } from 'express'

export const expressAdapterMiddleware = (middleware: AuthenticationMiddlewareInterface) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const input: HttpRequest = {
      headers: req.headers
    }

    const { statusCode, body }: HttpResponse = await middleware.execute(input)
    if (statusCode >= 200 && statusCode <= 399) {
      req.userId = body
      return next()
    }
    res.status(statusCode).json({ error: body.message })
  }
}
