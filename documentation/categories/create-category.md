# Cadastrar uma nova categoria de conta

> ## Caso de sucesso

1. ✅ Salva os dados da categoria
2. ✅ Retorna status 201 com id da categoria

> ## Exceções
1. ✅ Retorna 400 se o nome da categoria não for fornecido
2. ⛔ Retorna 500 se houver alguma falha na hora de salvar os dados


## Objeto Categogry
{
  	id: string
    name: string
    created_at: Date
    updated_at: Date
}

✅
⛔