import { JwtAdapter } from '@/infra/adapters/jwt.adapter'

export const buildJwtAdapter = (): JwtAdapter => {
  const secretkey = process.env.JWT_SECRET_KEY ?? 'b39311c63373f445534e3e8677f8d4c3'
  const expirationInMs = process.env.JWT_EXPIRATION_IN_MS ?? 86400000
  return new JwtAdapter(secretkey, +expirationInMs)
}
