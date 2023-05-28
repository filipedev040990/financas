import { AddUserPath, UpdateUserPath } from './paths/users'
import { serverErrorSchema } from './schemas/error'
import { addUserInputSchema, addUserOutputSchema } from './schemas/users'

export default {
  openapi: '3.0.0',
  info: {
    title: 'API do Sistema de Finanças',
    description: 'API do Sistema de Finanças',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'User'
  }],
  paths: {
    '/users': AddUserPath,
    '/users/{id}': UpdateUserPath
  },
  schemas: {
    addUserInputSchema,
    addUserOutputSchema,
    serverErrorSchema
  }
}
