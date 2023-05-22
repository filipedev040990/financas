# Cadastrar uma nova conta (a pagar/ a receber)

> ## Caso de sucesso

1. ✅ Salva os dados da conta
2. ✅ Calcula status da conta
3. ✅ Retorna status 201 com os dados da nova conta

> ## Exceções
1. ✅ Retorna 400 se o tipo não for fornecido
2. ✅ Retorna 400 se o tipo for inválido
3. ✅ Retorna 400 se a categoria não for fornecida
4. ✅ Retorna 400 se a categoria for inválida
5. ✅ Retorna 400 se a data de vencimento não for fornecida
6. ✅ Retorna 400 se a data de vencimento for inválida
7. ✅ Retorna 400 se o valor total não for fornecido
8. ✅ Retorna 400 se o valor total for inválido
9. ✅ Retorna 400 se o payment_method não for fornecido
10. ✅ Retorna 400 se o payment_method for inválido
11. ✅ Retorna 500 se houver alguma falha na hora de salvar os dados


## Objeto Bill
{
  	id: string
    type: string (pay/receive)
    category_id: string (agua/luz/telefone/etc) //referencia pra tabela de categoria
    expiration: Date
    total_value: number
    observation: long text
    status: string (aberto, pago, pago parcial, vencida)
    created_at: Date // pode ser usado como data de emissão
    updated_at: Date
}

✅
⛔