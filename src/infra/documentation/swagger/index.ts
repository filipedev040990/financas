import { AddBillPath, GetAllBillPath, GetBillByIdPath, UpdateBillPath } from './paths/bill'
import { AddCategoryPath } from './paths/category/add-category.path'
import { GetAllCategoryPath } from './paths/category/get-all-categories.path'
import { UpdateCategoryPath } from './paths/category/update-category.path'
import { AddUserPath, UpdateUserPath } from './paths/users'
import { addBillInputSchema, addBillOutputSchema, getAllBillOutputSchema, updateBillInputSchema, updateBillOutputSchema } from './schemas/bill'
import { addCategoryInputSchema, addCategoryOutputSchema, getAllCategoriesOutputSchema } from './schemas/category'
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
    '/v1/users': AddUserPath,
    '/v1/users/{id}': UpdateUserPath,
    '/v1/bill': AddBillPath,
    '/v1/bill/{id}': UpdateBillPath,
    '/v1/bill/': GetAllBillPath,
    '/v1/bill/{id}/': GetBillByIdPath,
    '/v1/category': AddCategoryPath,
    '/v1/category/{id}': UpdateCategoryPath,
    '/v1/category/': GetAllCategoryPath
  },
  schemas: {
    addUserInputSchema,
    addUserOutputSchema,
    serverErrorSchema,
    addBillInputSchema,
    addBillOutputSchema,
    updateBillInputSchema,
    updateBillOutputSchema,
    getAllBillOutputSchema,
    addCategoryInputSchema,
    addCategoryOutputSchema,
    getAllCategoriesOutputSchema
  }
}
