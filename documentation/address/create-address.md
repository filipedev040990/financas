# Cadastrar um novo endereço

> ## Caso de sucesso

1. ⛔ Salva os dados do endereço
2. ⛔ Retorna id do endereço cadastrado

> ## Exceções
1. ⛔ Retorna 500 se houver alguma falha na hora de salvar os dados


## Objeto Endereço
{
  	id: string
    cep: string
    street: string
    number: string
    complement: string?
    district: string
    city: string
    state: string
    country: string
    createdAt: Date
    updatedAt: Date
}

✅
⛔