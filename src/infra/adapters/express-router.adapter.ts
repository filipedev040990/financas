import { HttpRequest, HttpResponse } from '@/adapters/types/http.type'
import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { Request, Response } from 'express'

export const expressRouterAdapter = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const input: HttpRequest = {
      params: req?.params,
      body: req?.body
    }

    const output: HttpResponse = await controller.execute(input)

    const bodyResponse = output.statusCode === 500 ? { error: output.body.message } : output.body

    res.status(output.statusCode).json(bodyResponse)
  }
}
