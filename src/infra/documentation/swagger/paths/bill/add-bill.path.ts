export const AddBillPath = {
  post: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Bill'],
    summary: 'Cadastra uma nova conta',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addBillInputSchema'
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
              $ref: '#/schemas/addBillOutputSchema'
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
                  example: 'Missing param: type'
                }
              }
            }
          }
        }
      },
      401: {
        description: 'Não autorizado',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Unauthorized'
                }
              }
            }
          }
        }
      },
      403: {
        description: 'Acesso negado',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Forbidden'
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
