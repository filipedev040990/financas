import { AuthenticationMiddleware } from '@/adapters/middlewares/authentication.middleware'
import { buildGetUserById } from '../usecases/get-user-by-id.factory'
import { buildJwtAdapter } from '../adapters/jwt-adapter.factory'

export const buildAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const tokenValidator = buildJwtAdapter()
  const getUserByIdUseCase = buildGetUserById()
  return new AuthenticationMiddleware(tokenValidator, getUserByIdUseCase)
}
