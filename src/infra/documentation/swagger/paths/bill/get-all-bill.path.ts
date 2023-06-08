export const GetAllBillPath = {
  get: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Bill'],
    summary: 'Lista as contas cadastradas. Se houver um pagamento/recebimento da conta, será listado também.',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/getAllBillOutputSchema'
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
