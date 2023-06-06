import { HttpRequest } from '@/adapters/types/http.type'
import { AuthenticationMiddlewareInterface } from '@/application/interfaces/authentication-middleware.interface'
import { NextFunction, Request, Response } from 'express'

export const expressAdapterMiddleware = (middleware: AuthenticationMiddlewareInterface) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const input: HttpRequest = {
      headers: req.headers
    }

    await middleware.execute(input)
  }
}
