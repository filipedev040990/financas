# Cadastrar um novo fornecedor

> ## Caso de sucesso

1. ✅ Salva os dados do fornecedor
2. ✅ Retorna status 201

> ## Exceções
1. ✅ Retorna 400 se o nome do usuário não for fornecido
2. ✅ Retorna 400 se a senha do usuário não for fornecida
3. ✅ Retorna 400 se o login do usuário não for fornecido
4. ✅ Retorna 400 se o login informado já estiver em uso
5. ✅ Retorna 500 se houver alguma falha na hora de salvar os dados


## Objeto Fornecedor
{
  	id: string
    address_id: string
    name: string
    category: string (pf ou pj)
    document: string
    email: string?
    phone_number: string
    contact: string
    createdAt: Date
    updatedAt: Date
}

✅
⛔