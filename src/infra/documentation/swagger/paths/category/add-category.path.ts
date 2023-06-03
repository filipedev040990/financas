export const AddCategoryPath = {
  post: {
    tags: ['Category'],
    summary: 'Cadastra uma nova categoria de conta',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addCategoryInputSchema'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/addCategoryOutputSchema'
            }
          }
        }
      },
      400: {
        description: 'Requisição inválida',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Missing param: name'
                }
              }
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
