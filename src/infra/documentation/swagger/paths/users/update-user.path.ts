export const UpdateUserPath = {
  put: {
    security: [{
      bearerAuth: []
    }],
    tags: ['User'],
    summary: 'Atualiza dados do usuário',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'string',
        example: 'd8e9efde-1162-492c-8b26-588b598ccaac'
      }
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                required: true,
                example: 'José das Couves'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {

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
