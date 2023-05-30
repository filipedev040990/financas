import { SaveRequestRepositoryInterface } from '@/domain/interfaces/save-request-repository.interface'
import { UpdateRequestRepositoryInterface } from '@/domain/interfaces/update-request-repository.interface'
import { prismaClient } from '../prisma-client'

export class RequestRepository implements SaveRequestRepositoryInterface, UpdateRequestRepositoryInterface {
  async save (input: SaveRequestRepositoryInterface.Input): Promise<string> {
    const newRequest = await prismaClient.request.create({
      data: {
        id: input.id,
        originalUrl: input.originalUrl,
        method: input.method,
        ip: input.ip,
        input: input.input,
        created_at: input.created_at
      }
    })

    return newRequest.id
  }

  async update (input: UpdateRequestRepositoryInterface.Input): Promise<void> {
    await prismaClient.request.update({
      data: {
        status: input.status,
        output: input.output,
        updated_at: input.updated_at
      },
      where: { id: input.id }
    })
  }
}
