# Atualizar uma categoria de conta

> ## Caso de sucesso

1. ⛔ Atualiza os dados da categoria
2. ⛔ Retorna status 200

> ## Exceções
1. ⛔ Retorna 400 se o nome da categoria não for fornecido
1. ⛔ Retorna 400 se o id da categoria for inválido
2. ⛔ Retorna 500 se houver alguma falha na hora de atualizar os dados


## Objeto Categogry
{
  	id: string
    name: string
    created_at: Date
    updated_at: Date
}

✅
⛔