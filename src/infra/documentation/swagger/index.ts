import { AddBillPath } from './paths/bill'
import { AddUserPath, UpdateUserPath } from './paths/users'
import { addBillInputSchema, addBillOutputSchema } from './schemas/bill'
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
  }, {
    name: 'Bill'
  }],
  paths: {
    '/users': AddUserPath,
    '/users/{id}': UpdateUserPath,
    '/bill': AddBillPath
  },
  schemas: {
    addUserInputSchema,
    addUserOutputSchema,
    serverErrorSchema,
    addBillInputSchema,
    addBillOutputSchema
  }
}
