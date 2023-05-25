# Alterar uma conta (a pagar/ a receber)

> ## Caso de sucesso

1. ✅ Altera os dados da conta
2. ⛔ Recalcula status da conta
3. ⛔ Retorna status 200 com os dados da conta atualizado

> ## Exceções
1. ✅ Retorna 400 se o id da conta não for fornecido
2. ⛔ Retorna 400 se o id da conta for inválido
3. ⛔ Retorna 400 se o status da conta for diferente de (open, overdue)
4. ⛔ Retorna 400 se o tipo for inválido
5. ⛔ Retorna 400 se a categoria não for fornecida
6. ⛔ Retorna 400 se a categoria for inválida
7. ⛔ Retorna 400 se a data de vencimento não for fornecida
8. ⛔ Retorna 400 se a data de vencimento for inválida
9. ⛔ Retorna 400 se o valor total não for fornecido
10. ⛔ Retorna 400 se o valor total for inválido
11. ⛔ Retorna 500 se houver alguma falha na hora de salvar os dados


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