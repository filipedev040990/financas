export const GetAllCategoryPath = {
  get: {
    tags: ['Category'],
    summary: 'Lista as categorias cadastradas.',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/getAllCategoriesOutputSchema'
            }
          }
        }
      },
      500: {
        description: 'Erro interno do servidor.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/serverErrorSchema'
            }
          }
        }
      }
    }
  }
}
