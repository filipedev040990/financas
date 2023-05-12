import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import crypto from 'crypto'

export class UUIDAdapter implements UUIDGeneratorInterface {
  execute (): string {
    return crypto.randomUUID()
  }
}
