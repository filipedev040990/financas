import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { HttpRequest, HttpResponse } from '../types/http.type'
import { SaveRequestUseCaseInterface } from '@/application/interfaces/save-request-usecase.interface'
import { UpdateRequestUseCaseInterface } from '@/application/interfaces/update-request-usecase.interface'
import { serverError } from '../helpers/http.helper'

export class LogControllerDecorator implements ControllerInterface {
  constructor (
    private readonly saveRequestUseCase: SaveRequestUseCaseInterface,
    private readonly updateRequestUseCase: UpdateRequestUseCaseInterface,
    private readonly controller: ControllerInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    const requestId = await this.saveRequestUseCase.execute({
      originalUrl: input.originalUrl,
      method: input.method as string,
      ip: this.getIpFromRequest(input),
      input: JSON.stringify(input.body)
    })

    try {
      const output = await this.controller.execute(input)

      await this.updateRequestUseCase.execute({ id: requestId, output: JSON.stringify(output.body), status: +output.statusCode })

      return output
    } catch (error) {
      await this.updateRequestUseCase.execute({ id: requestId, output: JSON.stringify(error), status: 500 })
      return serverError(error)
    }
  }

  private getIpFromRequest (input: HttpRequest): string {
    const ips = (
      input.headers['cf-connecting-ip'] ||
        input.headers['x-real-ip'] ||
        input.headers['x-forwarded-for'] ||
        input.socket.remoteAddress || ''
    ).split(',')

    return ips[0].trim()
  }
}
